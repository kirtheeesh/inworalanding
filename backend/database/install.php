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
require_once dirname(__DIR__) . '/src/ProductRepository.php';

function step(string $message): void
{
    echo '  ' . $message . PHP_EOL;
}

function column_exists(PDO $pdo, string $table, string $column): bool
{
    $stmt = $pdo->prepare(
        'SELECT COUNT(*) FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?'
    );
    $stmt->execute([$table, $column]);

    return (int) $stmt->fetchColumn() > 0;
}

$database = env('DB_DATABASE', 'inworalanding');

echo PHP_EOL . "INWORA backend installer" . PHP_EOL;
echo str_repeat('-', 40) . PHP_EOL;

// ── 1. Schema ────────────────────────────────────────────────
try {
    $pdo = db();
} catch (Throwable $e) {
    echo PHP_EOL . "Could not connect to MySQL." . PHP_EOL;
    echo "  " . $e->getMessage() . PHP_EOL . PHP_EOL;
    echo "Check the DB_* values in backend/.env." . PHP_EOL . PHP_EOL;
    exit(1);
}

$schemaSql = file_get_contents(__DIR__ . '/schema.sql');
step("Database `$database` connection established.");

// schema.sql opens with `USE inworalanding`, so the block above creates the
// tables in that database. When DB_DATABASE points somewhere else, re-run just
// the CREATE TABLE statements through the app's own connection so the tables
// also exist where the app actually reads them. All are `IF NOT EXISTS`.
if (preg_match_all('/CREATE TABLE.*?;\s/is', $schemaSql, $createMatches)) {
    foreach ($createMatches[0] as $createStatement) {
        $pdo->exec($createStatement);
    }
}

// `CREATE TABLE IF NOT EXISTS` is a no-op on a `projects` table that already
// exists from before the banner slider / demo video columns were added — so
// add them explicitly here, guarded by an information_schema check (works on
// any MySQL/MariaDB version, unlike `ADD COLUMN IF NOT EXISTS`).
if (!column_exists($pdo, 'projects', 'video_type')) {
    $pdo->exec("ALTER TABLE projects ADD COLUMN video_type ENUM('youtube', 'upload') NULL DEFAULT NULL AFTER banner");
    step('Added `projects.video_type` column.');
}
if (!column_exists($pdo, 'projects', 'video_file')) {
    $pdo->exec('ALTER TABLE projects ADD COLUMN video_file VARCHAR(500) NULL DEFAULT NULL AFTER video_url');
    step('Added `projects.video_file` column.');
}
if (!column_exists($pdo, 'projects', 'show_web_view')) {
    $pdo->exec('ALTER TABLE projects ADD COLUMN show_web_view TINYINT(1) NOT NULL DEFAULT 1 AFTER is_published');
    step('Added `projects.show_web_view` column.');
}
if (!column_exists($pdo, 'projects', 'show_mobile_view')) {
    $pdo->exec('ALTER TABLE projects ADD COLUMN show_mobile_view TINYINT(1) NOT NULL DEFAULT 0 AFTER show_web_view');
    step('Added `projects.show_mobile_view` column.');
}

// Projects saved before this column existed may already have a YouTube embed
// URL in `video_url` — tag them as such so the admin form's radio toggle and
// the public API report them correctly.
$videoBackfilled = $pdo->exec(
    "UPDATE projects SET video_type = 'youtube'
     WHERE video_type IS NULL AND video_url IS NOT NULL AND video_url <> ''"
);
if ($videoBackfilled > 0) {
    step("Backfilled video_type='youtube' for $videoBackfilled project(s) with an existing video URL.");
}

// Same retrofit for `products` — banner slider, overview and demo video.
foreach ([
    'overview'   => "ALTER TABLE products ADD COLUMN overview LONGTEXT NULL AFTER description",
    'video_type' => "ALTER TABLE products ADD COLUMN video_type ENUM('youtube', 'upload') NULL DEFAULT NULL AFTER image",
    'video_url'  => 'ALTER TABLE products ADD COLUMN video_url VARCHAR(500) NULL AFTER video_type',
    'video_file' => 'ALTER TABLE products ADD COLUMN video_file VARCHAR(500) NULL AFTER video_url',
] as $column => $alterSql) {
    if (!column_exists($pdo, 'products', $column)) {
        $pdo->exec($alterSql);
        step("Added `products.$column` column.");
    }
}

$overviewBackfilled = $pdo->exec('UPDATE products SET overview = description WHERE overview IS NULL');
if ($overviewBackfilled > 0) {
    step("Backfilled `overview` from `description` for $overviewBackfilled product(s).");
}

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
        $banners = $project['banner'] ? [['image' => $project['banner'], 'sort_order' => 0]] : [];

        $repo->save(null, [
            'slug'         => $project['slug'],
            'title'        => $project['title'],
            'category'     => $project['category'],
            'short_desc'   => $project['short_desc'],
            'full_desc'    => $project['full_desc'],
            'icon'         => $project['icon'],
            'video_type'   => $project['video_url'] ? 'youtube' : null,
            'video_url'    => $project['video_url'],
            'video_file'   => null,
            'pdf_url'      => $project['pdf_url'],
            'live_url'     => $project['live_url'],
            'sort_order'   => $index,
            'is_published' => 1,
            'show_web_view' => 1,
            'show_mobile_view' => 0,
        ], $project['tags'], $project['features'], $banners, []);
    }

    step('Seeded ' . count($projects) . ' portfolio projects.');
}

// ── 3b. Backfill banner slides for projects saved before the slider ──
// Any project whose old single `banner` column is set but has no rows yet in
// `project_banners` gets one slide created from it, at priority 0. Safe to
// re-run — it only touches projects with zero existing slides.
$backfilled = $pdo->exec(
    "INSERT INTO project_banners (project_id, image, sort_order)
     SELECT p.id, p.banner, 0
     FROM projects p
     LEFT JOIN project_banners pb ON pb.project_id = p.id
     WHERE p.banner <> '' AND pb.id IS NULL"
);

if ($backfilled > 0) {
    step("Backfilled $backfilled banner slide(s) from the legacy `banner` column.");
}

// ── 4. Starter products ──────────────────────────────────────
$existingProducts = (int) $pdo->query('SELECT COUNT(*) FROM products')->fetchColumn();

if ($existingProducts > 0) {
    step("Skipped seeding products — the table already holds $existingProducts row(s).");
} else {
    $productRepo = new ProductRepository($pdo);
    $products = require __DIR__ . '/seed-data-products.php';

    foreach ($products as $index => $product) {
        $banners = $product['image'] ? [['image' => $product['image'], 'sort_order' => 0]] : [];

        $productRepo->save(null, [
            'slug'           => $product['slug'],
            'title'          => $product['title'],
            'subtitle'       => $product['subtitle'],
            'badge'          => $product['badge'],
            'tagline'        => $product['tagline'],
            'description'    => $product['description'],
            'overview'       => $product['description'],
            'icon'           => $product['icon'],
            'video_type'     => null,
            'video_url'      => null,
            'video_file'     => null,
            'live_url'       => $product['live_url'],
            'play_store_url' => $product['play_store_url'],
            'is_featured'    => $product['is_featured'],
            'sort_order'     => $index,
            'is_published'   => 1,
        ], $product['features'], $banners);
    }

    step('Seeded ' . count($products) . ' products.');
}

// ── 4b. Backfill banner slides for products saved before the slider ──
$productBannersBackfilled = $pdo->exec(
    "INSERT INTO product_banners (product_id, image, sort_order)
     SELECT p.id, p.image, 0
     FROM products p
     LEFT JOIN product_banners pb ON pb.product_id = p.id
     WHERE p.image <> '' AND pb.id IS NULL"
);
if ($productBannersBackfilled > 0) {
    step("Backfilled $productBannersBackfilled product banner slide(s) from the legacy `image` column.");
}

echo str_repeat('-', 40) . PHP_EOL;
echo "Done. Start the backend with:" . PHP_EOL;
echo "  php -S localhost:8000 -t backend backend/router.php" . PHP_EOL . PHP_EOL;
echo "Then open " . rtrim(env('APP_URL', 'http://localhost:8000'), '/') . "/admin" . PHP_EOL . PHP_EOL;
