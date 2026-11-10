<?php
require_once __DIR__ . '/../backend/config/database.php';
$pdo = db();

echo "=== PRODUCTS & BANNERS ===\n";
$stmt = $pdo->query("SELECT p.id, p.slug, p.title, pb.image, pb.sort_order 
                     FROM products p 
                     LEFT JOIN product_banners pb ON pb.product_id = p.id 
                     ORDER BY p.sort_order, pb.sort_order");
foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
    echo "{$row['slug']} (ID {$row['id']}): sort={$row['sort_order']} => {$row['image']}\n";
}

echo "\n=== PROJECTS & BANNERS COUNT ===\n";
$stmt = $pdo->query("SELECT p.id, p.slug, COUNT(pb.id) as banner_count 
                     FROM projects p 
                     LEFT JOIN project_banners pb ON pb.project_id = p.id 
                     GROUP BY p.id, p.slug 
                     ORDER BY p.id");
foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
    echo "{$row['slug']}: {$row['banner_count']} banners\n";
}
