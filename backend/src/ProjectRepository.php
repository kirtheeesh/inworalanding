<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/config/database.php';
require_once __DIR__ . '/helpers.php';

/**
 * All reads/writes for portfolio projects and their tags & features.
 */
class ProjectRepository
{
    /** Lucide icon names the admin can pick from; must exist in the frontend icon map. */
    public const ICONS = [
        'Layout', 'Database', 'Activity', 'Code', 'Compass', 'HardHat',
        'Globe', 'GraduationCap', 'Calculator', 'ShoppingCart', 'Smartphone',
        'Cloud', 'Cpu', 'LineChart', 'Users', 'Briefcase', 'Rocket', 'Boxes',
        'Gem', 'Utensils', 'Coffee', 'Building2', 'Store', 'Server',
    ];

    /** A project's demo video is a YouTube link OR an uploaded file — never both. */
    public const VIDEO_MODES = ['youtube', 'upload'];

    private PDO $db;

    public function __construct(?PDO $db = null)
    {
        $this->db = $db ?? db();
    }

    /**
     * @param bool $publishedOnly Restrict to published projects (what the public API serves).
     */
    public function all(bool $publishedOnly = false): array
    {
        $sql = 'SELECT * FROM projects';
        if ($publishedOnly) {
            $sql .= ' WHERE is_published = 1';
        }
        $sql .= ' ORDER BY sort_order ASC, id ASC';

        $projects = $this->db->query($sql)->fetchAll();

        return $this->attachChildren($projects);
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM projects WHERE id = ?');
        $stmt->execute([$id]);
        $project = $stmt->fetch();

        return $project ? $this->attachChildren([$project])[0] : null;
    }

    public function findBySlug(string $slug, bool $publishedOnly = false): ?array
    {
        $sql = 'SELECT * FROM projects WHERE slug = ?';
        if ($publishedOnly) {
            $sql .= ' AND is_published = 1';
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        $project = $stmt->fetch();

        return $project ? $this->attachChildren([$project])[0] : null;
    }

    /**
     * Insert or update a project together with its tags, features and banner slides.
     *
     * @param array<int, array{image: string, sort_order: int}> $banners Slider images.
     *        The lowest `sort_order` (highest priority) becomes the project's cover
     *        image, kept in the `banner` column for backward-compatible thumbnails.
     * @return int The project id.
     */
    /**
     * @param array<int, array{image: string, sort_order: int}> $banners Web slider images.
     * @param array<int, array{image: string, sort_order: int}> $mobileBanners Mobile phone screenshots.
     * @return int The project id.
     */
    public function save(?int $id, array $data, array $tags, array $features, array $banners = [], array $mobileBanners = []): int
    {
        usort($banners, static fn (array $a, array $b) => $a['sort_order'] <=> $b['sort_order']);
        usort($mobileBanners, static fn (array $a, array $b) => $a['sort_order'] <=> $b['sort_order']);

        $this->db->beginTransaction();

        try {
            $columns = [
                'slug'             => $data['slug'],
                'title'            => $data['title'],
                'category'         => $data['category'],
                'short_desc'       => $data['short_desc'],
                'full_desc'        => $data['full_desc'],
                'icon'             => $data['icon'],
                'banner'           => $banners[0]['image'] ?? '',
                'video_type'       => $data['video_type'] ?: null,
                'video_url'        => $data['video_url'] ?: null,
                'video_file'       => $data['video_file'] ?: null,
                'pdf_url'          => $data['pdf_url'] ?: null,
                'live_url'         => $data['live_url'] ?: null,
                'sort_order'       => $data['sort_order'],
                'is_published'     => $data['is_published'],
                'show_web_view'    => (int) ($data['show_web_view'] ?? 1),
                'show_mobile_view' => (int) ($data['show_mobile_view'] ?? 0),
            ];

            if ($id === null) {
                $names = array_keys($columns);
                $sql = sprintf(
                    'INSERT INTO projects (%s) VALUES (%s)',
                    implode(', ', $names),
                    implode(', ', array_map(static fn ($n) => ':' . $n, $names))
                );
                $this->db->prepare($sql)->execute($columns);
                $id = (int) $this->db->lastInsertId();
            } else {
                $assignments = implode(', ', array_map(static fn ($n) => "$n = :$n", array_keys($columns)));
                $stmt = $this->db->prepare("UPDATE projects SET $assignments WHERE id = :id");
                $stmt->execute($columns + ['id' => $id]);
            }

            $this->replaceChildren('project_tags', 'tag', $id, $tags);
            $this->replaceChildren('project_features', 'feature', $id, $features);
            $this->replaceBanners($id, $banners);
            $this->replaceMobileBanners($id, $mobileBanners);

            $this->db->commit();
        } catch (Throwable $e) {
            $this->db->rollBack();
            throw $e;
        }

        return $id;
    }

    public function delete(int $id): void
    {
        // Tags, features and banner slides cascade via foreign keys.
        $this->db->prepare('DELETE FROM projects WHERE id = ?')->execute([$id]);
    }

    /**
     * Make a slug unique by appending -2, -3, ... when it is already taken.
     *
     * @param int|null $ignoreId Project allowed to keep its own slug (during an edit).
     */
    public function uniqueSlug(string $slug, ?int $ignoreId = null): string
    {
        $slug = $slug !== '' ? $slug : 'project';
        $candidate = $slug;
        $suffix = 2;

        while (true) {
            $sql = 'SELECT COUNT(*) FROM projects WHERE slug = ?';
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
    public function toApiArray(array $project): array
    {
        $banners = array_map(
            static fn (array $b) => url($b['image']),
            $project['banners'] ?? []
        );
        // Defensive fallback for rows saved before the slider existed.
        if ($banners === [] && $project['banner'] !== '') {
            $banners = [url($project['banner'])];
        }

        $mobileBanners = array_map(
            static fn (array $b) => url($b['image']),
            $project['mobile_banners'] ?? []
        );

        return [
            'id'              => $project['slug'],
            'title'           => $project['title'],
            'category'        => $project['category'],
            'desc'            => $project['short_desc'],
            'fullDesc'        => $project['full_desc'],
            'icon'            => $project['icon'],
            'banner'          => $banners[0] ?? '',
            'banners'         => $banners,
            'mobileBanners'   => $mobileBanners,
            'showWebView'     => (bool) $project['show_web_view'],
            'showMobileView'  => (bool) $project['show_mobile_view'],
            'videoType'       => $project['video_type'] ?: null,
            'videoUrl'        => $project['video_type'] === 'youtube' ? $project['video_url'] : null,
            'videoFileUrl'    => $project['video_type'] === 'upload' && $project['video_file']
                ? url($project['video_file'])
                : null,
            'pdfUrl'   => $project['pdf_url'] ? url($project['pdf_url']) : null,
            'liveUrl'  => $project['live_url'] ?: null,
            'tags'     => $project['tags'],
            'features' => $project['features'],
        ];
    }

    /** Load tags, features and banner slides for the given rows in bulk (no N+1). */
    private function attachChildren(array $projects): array
    {
        if ($projects === []) {
            return [];
        }

        $ids = array_column($projects, 'id');
        $tags = $this->childrenFor('project_tags', 'tag', $ids);
        $features = $this->childrenFor('project_features', 'feature', $ids);
        $banners = $this->bannersFor($ids);
        $mobileBanners = $this->mobileBannersFor($ids);

        foreach ($projects as &$project) {
            $project['id'] = (int) $project['id'];
            $project['sort_order'] = (int) $project['sort_order'];
            $project['is_published'] = (int) $project['is_published'];
            $project['show_web_view'] = (int) ($project['show_web_view'] ?? 1);
            $project['show_mobile_view'] = (int) ($project['show_mobile_view'] ?? 0);
            $project['tags'] = $tags[$project['id']] ?? [];
            $project['features'] = $features[$project['id']] ?? [];
            $project['banners'] = $banners[$project['id']] ?? [];
            $project['mobile_banners'] = $mobileBanners[$project['id']] ?? [];
        }

        return $projects;
    }

    /** @return array<int, array<int, array{id: int, image: string, sort_order: int}>> Keyed by project id. */
    private function bannersFor(array $projectIds): array
    {
        $placeholders = implode(', ', array_fill(0, count($projectIds), '?'));
        $stmt = $this->db->prepare(
            "SELECT id, project_id, image, sort_order FROM project_banners
             WHERE project_id IN ($placeholders) ORDER BY sort_order ASC, id ASC"
        );
        $stmt->execute($projectIds);

        $grouped = [];
        foreach ($stmt->fetchAll() as $row) {
            $grouped[(int) $row['project_id']][] = [
                'id'         => (int) $row['id'],
                'image'      => $row['image'],
                'sort_order' => (int) $row['sort_order'],
            ];
        }

        return $grouped;
    }

    /** @param array<int, array{image: string, sort_order: int}> $banners Already sorted by priority. */
    private function replaceBanners(int $projectId, array $banners): void
    {
        $this->db->prepare('DELETE FROM project_banners WHERE project_id = ?')->execute([$projectId]);

        if ($banners === []) {
            return;
        }

        $stmt = $this->db->prepare('INSERT INTO project_banners (project_id, image, sort_order) VALUES (?, ?, ?)');
        foreach ($banners as $banner) {
            $stmt->execute([$projectId, $banner['image'], $banner['sort_order']]);
        }
    }

    /** @return array<int, array<int, array{id: int, image: string, sort_order: int}>> Keyed by project id. */
    private function mobileBannersFor(array $projectIds): array
    {
        $placeholders = implode(', ', array_fill(0, count($projectIds), '?'));
        $stmt = $this->db->prepare(
            "SELECT id, project_id, image, sort_order FROM project_mobile_banners
             WHERE project_id IN ($placeholders) ORDER BY sort_order ASC, id ASC"
        );
        $stmt->execute($projectIds);

        $grouped = [];
        foreach ($stmt->fetchAll() as $row) {
            $grouped[(int) $row['project_id']][] = [
                'id'         => (int) $row['id'],
                'image'      => $row['image'],
                'sort_order' => (int) $row['sort_order'],
            ];
        }

        return $grouped;
    }

    /** @param array<int, array{image: string, sort_order: int}> $banners Already sorted by priority. */
    private function replaceMobileBanners(int $projectId, array $banners): void
    {
        $this->db->prepare('DELETE FROM project_mobile_banners WHERE project_id = ?')->execute([$projectId]);

        if ($banners === []) {
            return;
        }

        $stmt = $this->db->prepare('INSERT INTO project_mobile_banners (project_id, image, sort_order) VALUES (?, ?, ?)');
        foreach ($banners as $banner) {
            $stmt->execute([$projectId, $banner['image'], $banner['sort_order']]);
        }
    }

    /** @return array<int, string[]> Keyed by project id. */
    private function childrenFor(string $table, string $column, array $projectIds): array
    {
        $placeholders = implode(', ', array_fill(0, count($projectIds), '?'));
        $stmt = $this->db->prepare(
            "SELECT project_id, $column FROM $table WHERE project_id IN ($placeholders) ORDER BY sort_order ASC, id ASC"
        );
        $stmt->execute($projectIds);

        $grouped = [];
        foreach ($stmt->fetchAll() as $row) {
            $grouped[(int) $row['project_id']][] = $row[$column];
        }

        return $grouped;
    }

    private function replaceChildren(string $table, string $column, int $projectId, array $values): void
    {
        $this->db->prepare("DELETE FROM $table WHERE project_id = ?")->execute([$projectId]);

        if ($values === []) {
            return;
        }

        $stmt = $this->db->prepare("INSERT INTO $table (project_id, $column, sort_order) VALUES (?, ?, ?)");
        foreach (array_values($values) as $index => $value) {
            $stmt->execute([$projectId, $value, $index]);
        }
    }
}
