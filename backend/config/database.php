<?php

declare(strict_types=1);

require_once __DIR__ . '/env.php';

/**
 * Shared PDO connection to the MySQL database.
 */
function db(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
        env('DB_HOST', '127.0.0.1'),
        env_int('DB_PORT', 3306),
        env('DB_DATABASE', 'inworalanding')
    );

    try {
        $pdo = new PDO($dsn, env('DB_USERNAME', 'root'), env('DB_PASSWORD', ''), [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    } catch (PDOException $e) {
        throw new RuntimeException(
            'Database connection failed. Check the DB_* values in backend/.env and make sure MySQL is running. '
            . 'Original error: ' . $e->getMessage(),
            0,
            $e
        );
    }

    return $pdo;
}
