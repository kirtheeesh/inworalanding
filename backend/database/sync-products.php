<?php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    exit('This script must be run from the command line.');
}

require_once dirname(__DIR__) . '/config/env.php';
require_once dirname(__DIR__) . '/src/helpers.php';
require_once dirname(__DIR__) . '/src/ProductRepository.php';

echo "Syncing products and multiple banner slides to database...\n";

try {
    $pdo = db();
    $repo = new ProductRepository($pdo);
    $products = require __DIR__ . '/seed-data-products.php';

    $updated = 0;
    $created = 0;

    foreach ($products as $index => $product) {
        $stmt = $pdo->prepare('SELECT id FROM products WHERE slug = ?');
        $stmt->execute([$product['slug']]);
        $existingId = $stmt->fetchColumn();

        $rawBanners = !empty($product['banners']) ? $product['banners'] : ($product['image'] ? [$product['image']] : []);
        $banners = [];
        foreach ($rawBanners as $bIndex => $bImg) {
            $banners[] = ['image' => $bImg, 'sort_order' => $bIndex];
        }

        $data = [
            'slug'           => $product['slug'],
            'title'          => $product['title'],
            'subtitle'       => $product['subtitle'],
            'badge'          => $product['badge'],
            'tagline'        => $product['tagline'],
            'description'    => $product['description'],
            'overview'       => $product['overview'] ?? $product['description'],
            'icon'           => $product['icon'],
            'video_type'     => null,
            'video_url'      => null,
            'video_file'     => null,
            'live_url'       => $product['live_url'],
            'play_store_url' => $product['play_store_url'],
            'is_featured'    => $product['is_featured'],
            'sort_order'     => $index,
            'is_published'   => 1,
        ];

        if ($existingId) {
            $repo->save((int)$existingId, $data, $product['features'], $banners);
            $updated++;
            echo "  [UPDATED] {$product['title']} ({$product['slug']}) -> " . count($banners) . " slides\n";
        } else {
            $repo->save(null, $data, $product['features'], $banners);
            $created++;
            echo "  [CREATED] {$product['title']} ({$product['slug']}) -> " . count($banners) . " slides\n";
        }
    }

    echo "\nProducts sync completed successfully: $created created, $updated updated. Total: " . count($products) . " products.\n";
} catch (Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
