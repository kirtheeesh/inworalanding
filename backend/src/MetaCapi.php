<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/RateLimiter.php';

/**
 * Meta Conversions API (server side of the Meta Pixel).
 *
 * The browser sends each consented Pixel event to POST /api/events with the
 * same event_id it gave fbq(), and this class forwards it to Meta so the two
 * copies are deduplicated.
 *
 * Configuration lives in a PRIVATE PHP file OUTSIDE public_html, never in
 * .env, the frontend or Git (see meta-capi.config.example.php):
 *
 *   /home/<user>/domains/inwora.com/private/meta-capi.config.php
 *
 * Fail closed: if that file is missing, unreadable, readable by other users,
 * invalid or disabled, or if cURL or the private storage folder is
 * unavailable, events are accepted and silently dropped. The website, the
 * browser Pixel and every other API keep working.
 *
 * Delivery is SYNCHRONOUS: the PHP request waits for Meta (2 s to connect,
 * 3 s in total). Where the server supports it, the browser connection is
 * closed first, but the PHP worker stays busy until Meta answers or the
 * timeout hits. There is no queue and no retry; a failed event is logged and
 * lost.
 */
final class MetaCapi
{
    /** The site's existing Pixel (also in frontend/src/lib/meta-pixel.ts). */
    public const PIXEL_ID = '1082744314811489';

    /** Events the browser may send. Lead, CompleteRegistration and Purchase are never accepted from the browser. */
    public const BROWSER_EVENTS = ['PageView', 'ViewContent', 'Contact'];

    /** Events only server code may send, and only after a confirmed success (unused today). */
    public const SERVER_ONLY_EVENTS = ['Lead', 'CompleteRegistration', 'Purchase'];

    public const MAX_BODY_BYTES = 4096;
    public const RATE_LIMIT_PER_MINUTE = 30;
    public const DEDUP_SECONDS = 600;

    private const CONNECT_TIMEOUT = 2;
    private const TOTAL_TIMEOUT = 3;
    private const CUSTOM_DATA_KEYS = ['content_name', 'content_category', 'content_ids', 'content_type'];
    private const BODY_KEYS = ['event_name', 'event_id', 'event_source_url', 'custom_data', 'consent'];
    private const IP_HEADERS = ['REMOTE_ADDR', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'HTTP_CF_CONNECTING_IP', 'HTTP_TRUE_CLIENT_IP', 'HTTP_X_CLIENT_IP'];

    /** @var array{ok: bool, reason: string, config: array<string, mixed>}|null */
    private static ?array $loaded = null;

    // ── Configuration ────────────────────────────────────────

    /** Path of the private config: three levels above backend/src = domains/inwora.com. */
    public static function configPath(): string
    {
        $override = getenv('INWORA_META_CAPI_CONFIG');
        if (is_string($override) && $override !== '') {
            return $override;
        }

        return dirname(__DIR__, 3) . '/private/meta-capi.config.php';
    }

    /** Folder for rate-limit and dedup files, next to the config (outside public_html). */
    public static function storageDir(): string
    {
        return dirname(self::configPath()) . '/capi-storage';
    }

    /**
     * Load and validate the private config. Never returns or logs the token.
     *
     * @return array{ok: bool, reason: string, config: array<string, mixed>}
     */
    public static function config(): array
    {
        if (self::$loaded !== null) {
            return self::$loaded;
        }

        $fail = static fn (string $reason): array => self::$loaded = ['ok' => false, 'reason' => $reason, 'config' => []];
        $path = self::configPath();
        clearstatcache(true, $path);

        if (!@is_file($path)) {
            return $fail('config file not found');
        }
        if (!@is_readable($path)) {
            return $fail('config file not readable');
        }

        $perms = @fileperms($path);
        if ($perms === false) {
            return $fail('config file permissions unknown');
        }
        if (($perms & 0007) !== 0) {
            return $fail('config file is accessible to other users (use 600)');
        }

        try {
            $config = (static fn (string $file) => include $file)($path);
        } catch (Throwable) {
            return $fail('config file could not be loaded');
        }
        if (!is_array($config)) {
            return $fail('config file must return an array');
        }

        if (($config['enabled'] ?? false) !== true) {
            return $fail('disabled in config');
        }

        $token = $config['access_token'] ?? '';
        if (!is_string($token) || !preg_match('/^[A-Za-z0-9_\-|]{20,512}$/', $token)) {
            return $fail('access_token missing or invalid');
        }

        $version = $config['graph_version'] ?? '';
        if (!is_string($version) || !preg_match('/^v\d{1,3}\.\d$/', $version)) {
            return $fail('graph_version missing or invalid (e.g. v26.0)');
        }

        $testCode = $config['test_event_code'] ?? '';
        if (!is_string($testCode) || ($testCode !== '' && !preg_match('/^[A-Za-z0-9]{1,40}$/', $testCode))) {
            return $fail('test_event_code invalid');
        }

        $ipHeader = $config['client_ip_header'] ?? 'REMOTE_ADDR';
        if (!is_string($ipHeader) || !in_array($ipHeader, self::IP_HEADERS, true)) {
            return $fail('client_ip_header must be one of: ' . implode(', ', self::IP_HEADERS));
        }

        if (!function_exists('curl_init')) {
            return $fail('PHP cURL extension not available');
        }

        return self::$loaded = [
            'ok' => true,
            'reason' => 'ok',
            'config' => [
                'access_token' => $token,
                'graph_version' => $version,
                'test_event_code' => $testCode,
                'client_ip_header' => $ipHeader,
            ],
        ];
    }

    // ── POST /api/events ─────────────────────────────────────

    /** Handle a browser event. Always ends the request. */
    public static function handleBrowserEvent(): void
    {
        $refuse = static fn (int $status, string $message) => json_response(['error' => $message], $status);

        if (!self::isSameOrigin()) {
            $refuse(403, 'Cross-origin requests are not allowed.');
        }

        $type = strtolower(trim(explode(';', (string) ($_SERVER['CONTENT_TYPE'] ?? ''))[0]));
        if ($type !== 'application/json') {
            $refuse(415, 'Content-Type must be application/json.');
        }

        if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > self::MAX_BODY_BYTES) {
            $refuse(413, 'Request body too large.');
        }
        $raw = (string) file_get_contents('php://input', false, null, 0, self::MAX_BODY_BYTES + 1);
        if (strlen($raw) > self::MAX_BODY_BYTES) {
            $refuse(413, 'Request body too large.');
        }

        $body = json_decode($raw, true);
        if (!is_array($body) || self::isList($body)) {
            $refuse(400, 'Invalid JSON body.');
        }

        $event = self::validateBrowserEvent($body);
        if (is_string($event)) {
            $refuse(400, $event);
        }

        // Without a valid private config, CAPI is off: accept and drop.
        $config = self::config();
        if (!$config['ok']) {
            json_response(['ok' => true], 202);
        }

        $limiter = new RateLimiter(self::storageDir());
        if (!$limiter->available()) {
            error_log('[inwora-capi] storage folder unavailable; event dropped');
            json_response(['ok' => true], 202);
        }

        $ip = self::clientIp($config['config']['client_ip_header']);
        if (!$limiter->hit('ip:' . ($ip ?? 'unknown'), self::RATE_LIMIT_PER_MINUTE, 60)) {
            $refuse(429, 'Too many events.');
        }

        // The same event_id twice (a retry) is sent to Meta only once.
        if (!$limiter->firstSeen('event:' . $event['event_name'] . ':' . $event['event_id'], self::DEDUP_SECONDS)) {
            json_response(['ok' => true], 202);
        }

        $userData = ['client_user_agent' => substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 512)];
        if ($ip !== null) {
            $userData['client_ip_address'] = $ip;
        }
        $fbp = (string) ($_COOKIE['_fbp'] ?? '');
        if (preg_match('/^fb\.\d\.\d{10,13}\.\d{1,20}$/', $fbp)) {
            $userData['fbp'] = $fbp;
        }
        $fbc = (string) ($_COOKIE['_fbc'] ?? '');
        if (strlen($fbc) <= 500 && preg_match('/^fb\.\d\.\d{10,13}\.[A-Za-z0-9_\-.]+$/', $fbc)) {
            $userData['fbc'] = $fbc;
        }

        $serverEvent = [
            'event_name' => $event['event_name'],
            'event_time' => time(),
            'event_id' => $event['event_id'],
            'event_source_url' => $event['event_source_url'],
            'action_source' => 'website',
            'user_data' => $userData,
        ];
        if ($event['custom_data'] !== []) {
            $serverEvent['custom_data'] = $event['custom_data'];
        }

        // Answer the browser first where the server allows it; the send below
        // still runs synchronously in this PHP process.
        self::respondEarly(['ok' => true], 202);
        self::send([$serverEvent], $config['config']);
        exit;
    }

    /**
     * Validate the browser's JSON. Returns the clean event or an error message.
     *
     * @param array<string, mixed> $body
     * @return array{event_name: string, event_id: string, event_source_url: string, custom_data: array<string, mixed>}|string
     */
    public static function validateBrowserEvent(array $body): array|string
    {
        foreach (array_keys($body) as $key) {
            if (!in_array($key, self::BODY_KEYS, true)) {
                return 'Unexpected field: ' . substr((string) $key, 0, 40);
            }
        }

        if (($body['consent'] ?? null) !== true) {
            return 'Consent required.';
        }

        $name = $body['event_name'] ?? null;
        if (!is_string($name) || !in_array($name, self::BROWSER_EVENTS, true)) {
            return 'Event not allowed.';
        }

        $id = $body['event_id'] ?? null;
        if (!is_string($id) || !preg_match('/^[A-Za-z0-9-]{8,64}$/', $id)) {
            return 'Invalid event_id.';
        }

        $sourceUrl = self::cleanSourceUrl($body['event_source_url'] ?? null);
        if ($sourceUrl === null) {
            return 'Invalid event_source_url.';
        }

        $custom = $body['custom_data'] ?? [];
        if (!is_array($custom) || ($custom !== [] && self::isList($custom))) {
            return 'Invalid custom_data.';
        }
        $clean = [];
        foreach ($custom as $key => $value) {
            if (!in_array($key, self::CUSTOM_DATA_KEYS, true)) {
                return 'custom_data field not allowed: ' . substr((string) $key, 0, 40);
            }
            if ($key === 'content_ids') {
                if (!is_array($value) || !self::isList($value) || count($value) > 5) {
                    return 'Invalid content_ids.';
                }
                foreach ($value as $contentId) {
                    if (!is_string($contentId) || !preg_match('/^[A-Za-z0-9_-]{1,80}$/', $contentId)) {
                        return 'Invalid content_ids.';
                    }
                }
                $clean[$key] = $value;
            } elseif ($key === 'content_type') {
                if ($value !== 'product') {
                    return 'Invalid content_type.';
                }
                $clean[$key] = $value;
            } else {
                if (!is_string($value) || $value === '' || mb_strlen($value) > 100 || preg_match('/[\x00-\x1F\x7F]/', $value)) {
                    return 'Invalid ' . $key . '.';
                }
                $clean[$key] = $value;
            }
        }

        return ['event_name' => $name, 'event_id' => $id, 'event_source_url' => $sourceUrl, 'custom_data' => $clean];
    }

    /** An https/http URL on this host, with query string and fragment removed. */
    private static function cleanSourceUrl(mixed $url): ?string
    {
        if (!is_string($url) || strlen($url) > 500) {
            return null;
        }
        $parts = parse_url($url);
        if (!is_array($parts) || !in_array($parts['scheme'] ?? '', ['https', 'http'], true)) {
            return null;
        }
        $host = strtolower($parts['host'] ?? '');
        if ($host === '' || $host !== self::requestHost()) {
            return null;
        }
        $path = $parts['path'] ?? '/';
        if (str_starts_with($path, '/admin')) {
            return null;
        }
        $port = isset($parts['port']) ? ':' . $parts['port'] : '';

        return $parts['scheme'] . '://' . $host . $port . $path;
    }

    private static function requestHost(): string
    {
        return strtolower((string) parse_url('http://' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST));
    }

    /** Same-origin check: Origin, else Sec-Fetch-Site, else Referer must match this host. */
    public static function isSameOrigin(): bool
    {
        $host = self::requestHost();
        if ($host === '') {
            return false;
        }

        $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
        if ($origin !== '') {
            return strtolower((string) parse_url($origin, PHP_URL_HOST)) === $host;
        }

        $site = strtolower((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
        if ($site !== '') {
            return $site === 'same-origin';
        }

        $referer = (string) ($_SERVER['HTTP_REFERER'] ?? '');

        return $referer !== '' && strtolower((string) parse_url($referer, PHP_URL_HOST)) === $host;
    }

    /** Visitor IP from the configured header (first entry of a list), validated. */
    public static function clientIp(string $header): ?string
    {
        $value = (string) ($_SERVER[$header] ?? '');
        $first = trim(explode(',', $value)[0]);

        return filter_var($first, FILTER_VALIDATE_IP) !== false ? $first : null;
    }

    /** @return list<string> */
    public static function ipHeaders(): array
    {
        return self::IP_HEADERS;
    }

    // ── Sending ──────────────────────────────────────────────

    /**
     * Send events to Meta for a confirmed server-side success (a saved
     * enquiry, a completed registration, a verified payment). Nothing calls
     * this today. Never call it for a WhatsApp click.
     *
     * @param array<string, mixed> $userData already hashed with meta_hash() where Meta requires it
     * @param array<string, mixed> $customData
     */
    public static function sendServerEvent(string $eventName, string $eventId, string $sourceUrl, array $userData, array $customData = []): bool
    {
        if (!in_array($eventName, array_merge(self::BROWSER_EVENTS, self::SERVER_ONLY_EVENTS), true)) {
            return false;
        }
        $config = self::config();
        if (!$config['ok']) {
            return false;
        }

        $event = [
            'event_name' => $eventName,
            'event_time' => time(),
            'event_id' => $eventId,
            'event_source_url' => $sourceUrl,
            'action_source' => 'website',
            'user_data' => $userData,
        ];
        if ($customData !== []) {
            $event['custom_data'] = $customData;
        }

        return self::send([$event], $config['config']);
    }

    /**
     * POST events to the Conversions API. Synchronous, with a 3-second cap.
     * Logs only the event names, HTTP status and Meta's error details.
     *
     * @param list<array<string, mixed>> $events
     * @param array<string, mixed> $config
     */
    private static function send(array $events, array $config): bool
    {
        // INWORA_META_CAPI_GRAPH_BASE exists only for local tests against a mock
        // server; it is a process environment variable, not settable from the web.
        $base = getenv('INWORA_META_CAPI_GRAPH_BASE');
        $base = is_string($base) && $base !== '' ? rtrim($base, '/') : 'https://graph.facebook.com';
        $url = sprintf('%s/%s/%s/events', $base, $config['graph_version'], self::PIXEL_ID);
        $payload = ['data' => $events, 'access_token' => $config['access_token']];
        if ($config['test_event_code'] !== '') {
            $payload['test_event_code'] = $config['test_event_code'];
        }
        $names = implode(',', array_column($events, 'event_name'));

        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_SLASHES),
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => self::CONNECT_TIMEOUT,
            CURLOPT_TIMEOUT => self::TOTAL_TIMEOUT,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
        ]);
        $response = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $curlError = curl_errno($curl);
        curl_close($curl);
        unset($payload);

        if ($response === false) {
            error_log(sprintf('[inwora-capi] %s not sent: cURL error %d', $names, $curlError));
            return false;
        }
        if ($status < 200 || $status >= 300) {
            $decoded = json_decode((string) $response, true);
            $error = is_array($decoded) && is_array($decoded['error'] ?? null) ? $decoded['error'] : [];
            error_log(sprintf(
                '[inwora-capi] %s rejected: HTTP %d, code %s, type %s, fbtrace_id %s, message %s',
                $names,
                $status,
                (string) ($error['code'] ?? '-'),
                substr((string) ($error['type'] ?? '-'), 0, 60),
                substr((string) ($error['fbtrace_id'] ?? '-'), 0, 60),
                substr(str_replace(["\r", "\n"], ' ', (string) ($error['message'] ?? '-')), 0, 200)
            ));
            return false;
        }

        return true;
    }

    /** Send the JSON answer and close the browser connection where the server supports it. */
    private static function respondEarly(array $data, int $status): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_SLASHES);

        if (function_exists('litespeed_finish_request')) {
            litespeed_finish_request();
        } elseif (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
        }
    }

    /** array_is_list() for PHP 8.0. */
    private static function isList(array $value): bool
    {
        return $value === [] || array_keys($value) === range(0, count($value) - 1);
    }

    /** Which early-finish function this server offers, for the diagnostics page. */
    public static function finishRequestFunction(): ?string
    {
        foreach (['litespeed_finish_request', 'fastcgi_finish_request'] as $function) {
            if (function_exists($function)) {
                return $function;
            }
        }

        return null;
    }
}

/**
 * Normalise and SHA-256 hash a customer identifier the way Meta requires.
 * For future server-confirmed forms only; nothing calls it today.
 *
 * Types: em (email), ph (phone, digits with country code), fn / ln (names),
 * ct (city), st (state code), zp (postal code), country (2-letter code).
 */
function meta_hash(string $type, string $value): ?string
{
    $value = trim(mb_strtolower($value));

    $normalised = match ($type) {
        'em' => $value,
        'ph' => preg_replace('/\D+/', '', $value),
        'fn', 'ln' => preg_replace('/[^\p{L}]+/u', '', $value),
        'ct' => preg_replace('/[^a-z]+/', '', $value),
        'st', 'country' => preg_replace('/[^a-z]+/', '', $value),
        'zp' => preg_replace('/\s+/', '', $value),
        default => null,
    };

    if ($normalised === null || $normalised === '') {
        return null;
    }

    return hash('sha256', $normalised);
}
