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
    ];

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
     * Insert or update a project together with its tags and features.
     *
     * @return int The project id.
     */
    public function save(?int $id, array $data, array $tags, array $features): int
    {
        $this->db->beginTransaction();

        try {
            $columns = [
                'slug'         => $data['slug'],
                'title'        => $data['title'],
                'category'     => $data['category'],
                'short_desc'   => $data['short_desc'],
                'full_desc'    => $data['full_desc'],
                'icon'         => $data['icon'],
                'banner'       => $data['banner'],
                'video_url'    => $data['video_url'] ?: null,
                'pdf_url'      => $data['pdf_url'] ?: null,
                'live_url'     => $data['live_url'] ?: null,
                'sort_order'   => $data['sort_order'],
                'is_published' => $data['is_published'],
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

            $this->db->commit();
        } catch (Throwable $e) {
            $this->db->rollBack();
            throw $e;
        }

        return $id;
    }

    public function delete(int $id): void
    {
        // Tags and features cascade via foreign keys.
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
        return [
            'id'       => $project['slug'],
            'title'    => $project['title'],
            'category' => $project['category'],
            'desc'     => $project['short_desc'],
            'fullDesc' => $project['full_desc'],
            'icon'     => $project['icon'],
            'banner'   => $project['banner'] !== '' ? url($project['banner']) : '',
            'videoUrl' => $project['video_url'] ?: null,
            'pdfUrl'   => $project['pdf_url'] ? url($project['pdf_url']) : null,
            'liveUrl'  => $project['live_url'] ?: null,
            'tags'     => $project['tags'],
            'features' => $project['features'],
        ];
    }

    /** Load tags and features for the given rows in two queries (no N+1). */
    private function attachChildren(array $projects): array
    {
        if ($projects === []) {
            return [];
        }

        $ids = array_column($projects, 'id');
        $tags = $this->childrenFor('project_tags', 'tag', $ids);
        $features = $this->childrenFor('project_features', 'feature', $ids);

        foreach ($projects as &$project) {
            $project['id'] = (int) $project['id'];
            $project['sort_order'] = (int) $project['sort_order'];
            $project['is_published'] = (int) $project['is_published'];
            $project['tags'] = $tags[$project['id']] ?? [];
            $project['features'] = $features[$project['id']] ?? [];
        }

        return $projects;
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
