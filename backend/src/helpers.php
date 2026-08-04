<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/config/env.php';

/**
 * Base URL the app is being served from.
 *
 * Links are built from the host that actually served the request, so the same
 * backend works whether it is opened directly (http://localhost:8000/admin) or
 * through the frontend's dev proxy (http://localhost:5173/admin -> PHP). The
 * path prefix for sub-directory installs still comes from APP_URL. On the CLI
 * (installer) there is no request, so APP_URL is used in full.
 */
function base_url(): string
{
    static $base = null;

    if ($base !== null) {
        return $base;
    }

    $host = $_SERVER['HTTP_HOST'] ?? '';
    if ($host === '') {
        return $base = rtrim(env('APP_URL', ''), '/');
    }

    $https = (!empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    $prefix = rtrim(parse_url(env('APP_URL', ''), PHP_URL_PATH) ?: '', '/');

    return $base = ($https ? 'https' : 'http') . '://' . $host . $prefix;
}

/**
 * Absolute URL to a path on this backend.
 * Values that are already absolute (http/https) are returned untouched.
 */
function url(string $path = ''): string
{
    if (preg_match('#^https?://#i', $path)) {
        return $path;
    }

    return base_url() . '/' . ltrim($path, '/');
}

/** Escape a value for safe HTML output. */
function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Turn a title into a URL-safe slug, e.g. "POS & KOT" -> "pos-kot". */
function slugify(string $value): string
{
    $slug = strtolower(trim($value));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';

    return trim($slug, '-');
}

function redirect(string $path): void
{
    header('Location: ' . url($path));
    exit;
}

/** Send a JSON response and stop. */
function json_response($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/** Emit CORS headers for the public API, restricted to CORS_ALLOWED_ORIGINS. */
function apply_cors(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return;
    }

    $allowed = array_filter(array_map('trim', explode(',', env('CORS_ALLOWED_ORIGINS', ''))));
    if (in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }
}

// ── Session, flash messages and CSRF ─────────────────────────

function session_start_once(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
}

function flash(string $type, ?string $message = null): ?string
{
    session_start_once();

    if ($message !== null) {
        $_SESSION['flash'][$type] = $message;

        return null;
    }

    $value = $_SESSION['flash'][$type] ?? null;
    unset($_SESSION['flash'][$type]);

    return $value;
}

function csrf_token(): string
{
    session_start_once();

    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function csrf_verify(): void
{
    session_start_once();
    $submitted = $_POST['_csrf'] ?? '';

    if (!is_string($submitted) || !hash_equals($_SESSION['csrf_token'] ?? '', $submitted)) {
        http_response_code(419);
        exit('Session expired — please reload the page and try again.');
    }
}

// ── Request input ────────────────────────────────────────────

function post(string $key, string $default = ''): string
{
    $value = $_POST[$key] ?? $default;

    return is_string($value) ? trim($value) : $default;
}

/** Split a textarea into a clean list, one item per line. */
function post_lines(string $key): array
{
    $raw = $_POST[$key] ?? '';
    if (!is_string($raw) || trim($raw) === '') {
        return [];
    }

    $lines = preg_split('/\r\n|\r|\n/', $raw) ?: [];

    return array_values(array_filter(array_map('trim', $lines), static fn ($l) => $l !== ''));
}
