<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/config/database.php';
require_once __DIR__ . '/helpers.php';

/**
 * All reads/writes for the official INWORA products and their feature lists.
 * Mirrors ProjectRepository — kept as a separate table so the admin form only
 * shows product-relevant fields.
 */
class ProductRepository
{
    /** Lucide icon names the admin can pick from; must exist in the frontend icon map. */
    public const ICONS = [
        'Image', 'Monitor', 'Send', 'MessageCircle', 'HardHat', 'Factory',
        'Store', 'ShoppingBag', 'Smartphone', 'Building2', 'Package', 'Boxes',
        'Cloud', 'Cpu', 'Database', 'LineChart', 'Rocket', 'Sparkles',
    ];

    /** A product's demo video is a YouTube link OR an uploaded file — never both. */
    public const VIDEO_MODES = ['youtube', 'upload'];

    private PDO $db;

    public function __construct(?PDO $db = null)
    {
        $this->db = $db ?? db();
    }

    /**
     * @param bool $publishedOnly Restrict to published products (what the public API serves).
     */
    public function all(bool $publishedOnly = false): array
    {
        $sql = 'SELECT * FROM products';
        if ($publishedOnly) {
            $sql .= ' WHERE is_published = 1';
        }
        $sql .= ' ORDER BY sort_order ASC, id ASC';

        $products = $this->db->query($sql)->fetchAll();

        return $this->attachChildren($products);
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $product = $stmt->fetch();

        return $product ? $this->attachChildren([$product])[0] : null;
    }

    public function findBySlug(string $slug, bool $publishedOnly = false): ?array
    {
        $sql = 'SELECT * FROM products WHERE slug = ?';
        if ($publishedOnly) {
            $sql .= ' AND is_published = 1';
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        $product = $stmt->fetch();

        return $product ? $this->attachChildren([$product])[0] : null;
    }

    /**
     * Insert or update a product together with its features and banner slides.
     *
     * @param array<int, array{image: string, sort_order: int}> $banners Slider images.
     *        The lowest `sort_order` (highest priority) becomes the product's cover
     *        image, kept in the `image` column for backward-compatible card thumbnails.
     * @return int The product id.
     */
    public function save(?int $id, array $data, array $features, array $banners = []): int
    {
        usort($banners, static fn (array $a, array $b) => $a['sort_order'] <=> $b['sort_order']);

        $this->db->beginTransaction();

        try {
            $columns = [
                'slug'           => $data['slug'],
                'title'          => $data['title'],
                'subtitle'       => $data['subtitle'],
                'badge'          => $data['badge'],
                'tagline'        => $data['tagline'],
                'description'    => $data['description'],
                'overview'       => $data['overview'] ?: null,
                'icon'           => $data['icon'],
                'image'          => $banners[0]['image'] ?? '',
                'video_type'     => $data['video_type'] ?: null,
                'video_url'      => $data['video_url'] ?: null,
                'video_file'     => $data['video_file'] ?: null,
                'live_url'       => $data['live_url'] ?: null,
                'play_store_url' => $data['play_store_url'] ?: null,
                'is_featured'    => $data['is_featured'],
                'sort_order'     => $data['sort_order'],
                'is_published'   => $data['is_published'],
            ];

            if ($id === null) {
                $names = array_keys($columns);
                $sql = sprintf(
                    'INSERT INTO products (%s) VALUES (%s)',
                    implode(', ', $names),
                    implode(', ', array_map(static fn ($n) => ':' . $n, $names))
                );
                $this->db->prepare($sql)->execute($columns);
                $id = (int) $this->db->lastInsertId();
            } else {
                $assignments = implode(', ', array_map(static fn ($n) => "$n = :$n", array_keys($columns)));
                $stmt = $this->db->prepare("UPDATE products SET $assignments WHERE id = :id");
                $stmt->execute($columns + ['id' => $id]);
            }

            $this->replaceChildren('product_features', 'feature', $id, $features);
            $this->replaceBanners($id, $banners);

            $this->db->commit();
        } catch (Throwable $e) {
            $this->db->rollBack();
            throw $e;
        }

        return $id;
    }

    public function delete(int $id): void
    {
        // Features and banner slides cascade via foreign keys.
        $this->db->prepare('DELETE FROM products WHERE id = ?')->execute([$id]);
    }

    /**
     * Make a slug unique by appending -2, -3, ... when it is already taken.
     *
     * @param int|null $ignoreId Product allowed to keep its own slug (during an edit).
     */
    public function uniqueSlug(string $slug, ?int $ignoreId = null): string
    {
        $slug = $slug !== '' ? $slug : 'product';
        $candidate = $slug;
        $suffix = 2;

        while (true) {
            $sql = 'SELECT COUNT(*) FROM products WHERE slug = ?';
            $params = [$candidate];
            if ($ignoreId !== null) {
                $sql .= ' AND id <> ?';
                $params[] = $ignoreId;
            }

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);

            if ((int) $stmt->fetchColumn() === 0) {
                return $candidate;
            }

            $candidate = $slug . '-' . $suffix++;
        }
    }

    /**
     * Shape a row the way the React frontend expects it.
     */
    public function toApiArray(array $product): array
    {
        $banners = array_map(
            static fn (array $b) => url($b['image']),
            $product['banners'] ?? []
        );
        // Defensive fallback for rows saved before the slider existed.
        if ($banners === [] && $product['image'] !== '') {
            $banners = [url($product['image'])];
        }

        return [
            'id'           => $product['slug'],
            'title'        => $product['title'],
            'subtitle'     => $product['subtitle'],
            'badge'        => $product['badge'],
            'tagline'      => $product['tagline'],
            'desc'         => $product['description'],
            'overview'     => $product['overview'] ?: $product['description'],
            'icon'         => $product['icon'],
            'image'        => $banners[0] ?? '',
            'banners'      => $banners,
            'videoType'    => $product['video_type'] ?: null,
            'videoUrl'     => $product['video_type'] === 'youtube' ? $product['video_url'] : null,
            'videoFileUrl' => $product['video_type'] === 'upload' && $product['video_file']
                ? url($product['video_file'])
                : null,
            'liveUrl'      => $product['live_url'] ?: null,
            'playStoreUrl' => $product['play_store_url'] ?: null,
            'featured'     => (bool) $product['is_featured'],
            'features'     => $product['features'],
        ];
    }

    /** Load features and banner slides for the given rows in two queries (no N+1). */
    private function attachChildren(array $products): array
    {
        if ($products === []) {
            return [];
        }

        $ids = array_column($products, 'id');
        $features = $this->childrenFor('product_features', 'feature', $ids);
        $banners = $this->bannersFor($ids);

        foreach ($products as &$product) {
            $product['id'] = (int) $product['id'];
            $product['sort_order'] = (int) $product['sort_order'];
            $product['is_featured'] = (int) $product['is_featured'];
            $product['is_published'] = (int) $product['is_published'];
            $product['features'] = $features[$product['id']] ?? [];
            $product['banners'] = $banners[$product['id']] ?? [];
        }

        return $products;
    }

    /** @return array<int, array<int, array{id: int, image: string, sort_order: int}>> Keyed by product id. */
    private function bannersFor(array $productIds): array
    {
        $placeholders = implode(', ', array_fill(0, count($productIds), '?'));
        $stmt = $this->db->prepare(
            "SELECT id, product_id, image, sort_order FROM product_banners
             WHERE product_id IN ($placeholders) ORDER BY sort_order ASC, id ASC"
        );
        $stmt->execute($productIds);

        $grouped = [];
        foreach ($stmt->fetchAll() as $row) {
            $grouped[(int) $row['product_id']][] = [
                'id'         => (int) $row['id'],
                'image'      => $row['image'],
                'sort_order' => (int) $row['sort_order'],
            ];
        }

        return $grouped;
    }

    /** @param array<int, array{image: string, sort_order: int}> $banners Already sorted by priority. */
    private function replaceBanners(int $productId, array $banners): void
    {
        $this->db->prepare('DELETE FROM product_banners WHERE product_id = ?')->execute([$productId]);

        if ($banners === []) {
            return;
        }

        $stmt = $this->db->prepare('INSERT INTO product_banners (product_id, image, sort_order) VALUES (?, ?, ?)');
        foreach ($banners as $banner) {
            $stmt->execute([$productId, $banner['image'], $banner['sort_order']]);
        }
    }

    /** @return array<int, string[]> Keyed by product id. */
    private function childrenFor(string $table, string $column, array $productIds): array
    {
        $placeholders = implode(', ', array_fill(0, count($productIds), '?'));
        $stmt = $this->db->prepare(
            "SELECT product_id, $column FROM $table WHERE product_id IN ($placeholders) ORDER BY sort_order ASC, id ASC"
        );
        $stmt->execute($productIds);

        $grouped = [];
        foreach ($stmt->fetchAll() as $row) {
            $grouped[(int) $row['product_id']][] = $row[$column];
        }

        return $grouped;
    }

    private function replaceChildren(string $table, string $column, int $productId, array $values): void
    {
        $this->db->prepare("DELETE FROM $table WHERE product_id = ?")->execute([$productId]);

        if ($values === []) {
            return;
        }

        $stmt = $this->db->prepare("INSERT INTO $table (product_id, $column, sort_order) VALUES (?, ?, ?)");
        foreach (array_values($values) as $index => $value) {
            $stmt->execute([$productId, $value, $index]);
        }
    }
}
