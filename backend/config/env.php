<?php

declare(strict_types=1);

/**
 * Minimal .env loader. Keeps the backend dependency-free (no Composer needed).
 */

function env_load(string $file): void
{
    static $loaded = [];

    if (isset($loaded[$file]) || !is_readable($file)) {
        return;
    }
    $loaded[$file] = true;

    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || !str_contains($line, '=')) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        // Strip matching surrounding quotes, if any.
        $len = strlen($value);
        if ($len >= 2 && ($value[0] === '"' || $value[0] === "'") && $value[0] === $value[$len - 1]) {
            $value = substr($value, 1, -1);
        }

        // A real environment variable always wins over the file, so hosting
        // panels and `DB_PORT=3307 php ...` can override without edits.
        $_ENV[$key] = getenv($key) !== false ? getenv($key) : $value;
    }
}

function env(string $key, ?string $default = null): ?string
{
    if (isset($_ENV[$key])) {
        return $_ENV[$key];
    }

    $value = getenv($key);

    return $value !== false ? $value : $default;
}

function env_bool(string $key, bool $default = false): bool
{
    $value = env($key);
    if ($value === null) {
        return $default;
    }

    return in_array(strtolower($value), ['1', 'true', 'yes', 'on'], true);
}

function env_int(string $key, int $default): int
{
    $value = env($key);

    return is_numeric($value) ? (int) $value : $default;
}

env_load(dirname(__DIR__) . '/.env');
