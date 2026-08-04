<?php

declare(strict_types=1);

/**
 * Router for PHP's built-in server, so the backend runs without Apache:
 *
 *   php -S localhost:8000 -t backend backend/router.php
 *
 * Only /uploads/* is served straight from disk; everything else — including
 * any attempt to fetch .env or a source file — goes through index.php.
 */

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

if (str_starts_with($path, '/uploads/')) {
    $file = __DIR__ . '/' . ltrim($path, '/');
    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

    if (is_file($file) && !in_array($extension, ['php', 'phtml', 'phar', 'htaccess'], true)) {
        return false; // Let the built-in server stream the file.
    }
}

require __DIR__ . '/index.php';
