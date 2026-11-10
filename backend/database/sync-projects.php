<?php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    exit('This script must be run from the command line.');
}

require_once dirname(__DIR__) . '/config/env.php';
require_once dirname(__DIR__) . '/src/helpers.php';
require_once dirname(__DIR__) . '/src/ProjectRepository.php';

echo "Syncing portfolio projects to database...\n";

try {
    $pdo = db();
    $repo = new ProjectRepository($pdo);
    $projects = require __DIR__ . '/seed-data.php';

    $updated = 0;
    $created = 0;

    foreach ($projects as $index => $project) {
        $stmt = $pdo->prepare('SELECT id FROM projects WHERE slug = ?');
        $stmt->execute([$project['slug']]);
        $existingId = $stmt->fetchColumn();

        $rawBanners = !empty($project['banners']) ? $project['banners'] : ($project['banner'] ? [$project['banner']] : []);
        $banners = [];
        foreach ($rawBanners as $bIndex => $bImg) {
            $banners[] = ['image' => $bImg, 'sort_order' => $bIndex];
        }

        $data = [
            'slug'             => $project['slug'],
            'title'            => $project['title'],
            'category'         => $project['category'],
            'short_desc'       => $project['short_desc'],
            'full_desc'        => $project['full_desc'],
            'icon'             => $project['icon'],
            'video_type'       => $project['video_url'] ? 'youtube' : null,
            'video_url'        => $project['video_url'],
            'video_file'       => null,
            'pdf_url'          => $project['pdf_url'],
            'live_url'         => $project['live_url'],
            'sort_order'       => $index,
            'is_published'     => 1,
            'show_web_view'    => 1,
            'show_mobile_view' => 0,
        ];

        if ($existingId) {
            $repo->save((int)$existingId, $data, $project['tags'], $project['features'], $banners, []);
            $updated++;
            echo "  [UPDATED] {$project['title']} ({$project['slug']}) -> {$project['category']}\n";
        } else {
            $repo->save(null, $data, $project['tags'], $project['features'], $banners, []);
            $created++;
            echo "  [CREATED] {$project['title']} ({$project['slug']}) -> {$project['category']}\n";
        }
    }

    echo "\nSync completed successfully: $created created, $updated updated. Total: " . count($projects) . " projects.\n";
} catch (Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
