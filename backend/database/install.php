<?php

declare(strict_types=1);

/**
 * One-shot installer — safe to re-run.
 *
 *   php backend/database/install.php
 *
 * 1. Creates the database and tables from schema.sql
 * 2. Creates (or resets) the admin user from ADMIN_USERNAME / ADMIN_PASSWORD
 * 3. Seeds the starter projects, but only when the table is still empty
 */

if (PHP_SAPI !== 'cli') {
    exit('This installer must be run from the command line.');
}

require_once dirname(__DIR__) . '/config/env.php';
require_once dirname(__DIR__) . '/src/helpers.php';
require_once dirname(__DIR__) . '/src/ProjectRepository.php';

function step(string $message): void
{
    echo '  ' . $message . PHP_EOL;
}

$database = env('DB_DATABASE', 'inworalanding');

echo PHP_EOL . "INWORA backend installer" . PHP_EOL;
echo str_repeat('-', 40) . PHP_EOL;

// ── 1. Schema ────────────────────────────────────────────────
try {
    $bootstrap = new PDO(
        sprintf('mysql:host=%s;port=%d;charset=utf8mb4', env('DB_HOST', '127.0.0.1'), env_int('DB_PORT', 3306)),
        env('DB_USERNAME', 'root'),
        env('DB_PASSWORD', ''),
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    echo PHP_EOL . "Could not connect to MySQL." . PHP_EOL;
    echo "  " . $e->getMessage() . PHP_EOL . PHP_EOL;
    echo "Start MySQL (XAMPP Control Panel, or `sudo /Applications/XAMPP/xamppfiles/xampp startmysql`)" . PHP_EOL;
    echo "and check the DB_* values in backend/.env." . PHP_EOL . PHP_EOL;
    exit(1);
}

$bootstrap->exec(file_get_contents(__DIR__ . '/schema.sql'));
step("Database `$database` and tables are ready.");

// From here on use the shared connection, which selects the database.
$pdo = db();

// ── 2. Admin user ────────────────────────────────────────────
$username = env('ADMIN_USERNAME', 'admin');
$password = env('ADMIN_PASSWORD', 'admin123');
$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare(
    'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)'
);
$stmt->execute([$username, $hash]);
step("Admin user `$username` is ready (password taken from .env).");

// ── 3. Starter projects ──────────────────────────────────────
$existing = (int) $pdo->query('SELECT COUNT(*) FROM projects')->fetchColumn();

if ($existing > 0) {
    step("Skipped seeding — the projects table already holds $existing row(s).");
} else {
    $repo = new ProjectRepository($pdo);
    $projects = require __DIR__ . '/seed-data.php';

    foreach ($projects as $index => $project) {
        $repo->save(null, [
            'slug'         => $project['slug'],
            'title'        => $project['title'],
            'category'     => $project['category'],
            'short_desc'   => $project['short_desc'],
            'full_desc'    => $project['full_desc'],
            'icon'         => $project['icon'],
            'banner'       => $project['banner'],
            'video_url'    => $project['video_url'],
            'pdf_url'      => $project['pdf_url'],
            'live_url'     => $project['live_url'],
            'sort_order'   => $index,
            'is_published' => 1,
        ], $project['tags'], $project['features']);
    }

    step('Seeded ' . count($projects) . ' portfolio projects.');
}

echo str_repeat('-', 40) . PHP_EOL;
echo "Done. Start the backend with:" . PHP_EOL;
echo "  php -S localhost:8000 -t backend backend/router.php" . PHP_EOL . PHP_EOL;
echo "Then open " . rtrim(env('APP_URL', 'http://localhost:8000'), '/') . "/admin" . PHP_EOL . PHP_EOL;
