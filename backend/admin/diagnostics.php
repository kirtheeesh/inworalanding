<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/MetaCapi.php';

/**
 * GET /admin/diagnostics — Meta CAPI readiness checks, behind the admin login.
 * Shows yes/no facts only: never the token or the config file's contents.
 */
function admin_diagnostics(): void
{
    $path = MetaCapi::configPath();
    $exists = @is_file($path);
    $perms = $exists ? @fileperms($path) : false;
    $config = MetaCapi::config();
    $storage = MetaCapi::storageDir();

    $ipHeaders = [];
    foreach (MetaCapi::ipHeaders() as $header) {
        if (isset($_SERVER[$header]) && $_SERVER[$header] !== '') {
            $ipHeaders[$header] = (string) $_SERVER[$header];
        }
    }

    view('diagnostics', [
        'title' => 'Diagnostics',
        'checks' => [
            'PHP version' => PHP_VERSION,
            'cURL extension' => function_exists('curl_init') ? 'available (' . (curl_version()['version'] ?? '?') . ', ' . (curl_version()['ssl_version'] ?? '?') . ')' : 'NOT available',
            'open_basedir' => (string) ini_get('open_basedir') !== '' ? (string) ini_get('open_basedir') : '(not set)',
            'Early response (finish_request)' => MetaCapi::finishRequestFunction() ?? 'not available: the browser waits for Meta (max 3 s)',
            'Private config path' => $path,
            'Config file exists' => $exists ? 'yes' : 'no',
            'Config file readable' => $exists && @is_readable($path) ? 'yes' : 'no',
            'Config file permissions' => $perms !== false ? substr(sprintf('%o', $perms), -3) . (($perms & 0077) === 0 ? ' (good)' : ' (should be 600)') : '-',
            'CAPI status' => $config['ok'] ? 'ENABLED' : 'off: ' . $config['reason'],
            'Access token set' => $config['ok'] ? 'yes' : 'no',
            'Graph API version' => $config['ok'] ? (string) $config['config']['graph_version'] : '-',
            'Test event code set' => $config['ok'] ? ($config['config']['test_event_code'] !== '' ? 'yes (events go to Test Events only)' : 'no') : '-',
            'Client IP header in config' => $config['ok'] ? (string) $config['config']['client_ip_header'] : '-',
            'Storage folder' => $storage,
            'Storage folder writable' => (new RateLimiter($storage))->available() ? 'yes' : 'no',
        ],
        'ipHeaders' => $ipHeaders,
    ]);
}
