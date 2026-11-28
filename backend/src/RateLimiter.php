<?php

declare(strict_types=1);

/**
 * File-based rate limiting and duplicate-ID detection for the Meta CAPI
 * endpoint. No database: one small file per key, stored in a private folder
 * outside public_html. Keys are hashed, so no IP address or event ID is
 * written to disk in readable form.
 */
final class RateLimiter
{
    public function __construct(private string $dir)
    {
    }

    /** Create the folder (700) if needed; false when it can't be used. */
    public function available(): bool
    {
        if (!@is_dir($this->dir) && !@mkdir($this->dir, 0700, true) && !@is_dir($this->dir)) {
            return false;
        }

        return @is_writable($this->dir);
    }

    /** Record a hit; false once $limit hits fall inside the last $windowSeconds. */
    public function hit(string $key, int $limit, int $windowSeconds): bool
    {
        $now = time();
        $handle = @fopen($this->path('rl', $key), 'c+');
        if ($handle === false) {
            return false;
        }

        try {
            flock($handle, LOCK_EX);
            $hits = json_decode((string) stream_get_contents($handle), true);
            $hits = is_array($hits) ? array_values(array_filter($hits, static fn ($t) => is_int($t) && $t > $now - $windowSeconds)) : [];

            if (count($hits) >= $limit) {
                return false;
            }

            $hits[] = $now;
            ftruncate($handle, 0);
            rewind($handle);
            fwrite($handle, json_encode($hits));

            return true;
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
            $this->collectGarbage($windowSeconds);
        }
    }

    /** True the first time $key is seen within $ttlSeconds, false for repeats. */
    public function firstSeen(string $key, int $ttlSeconds): bool
    {
        $file = $this->path('id', $key);
        $handle = @fopen($file, 'x');
        if ($handle !== false) {
            fclose($handle);
            return true;
        }

        $mtime = @filemtime($file);
        if ($mtime !== false && $mtime > time() - $ttlSeconds) {
            return false;
        }

        @touch($file);

        return true;
    }

    private function path(string $kind, string $key): string
    {
        return $this->dir . '/' . $kind . '-' . hash('sha256', $key);
    }

    /** About 1 request in 50 removes files older than an hour. */
    private function collectGarbage(int $windowSeconds): void
    {
        if (random_int(1, 50) !== 1) {
            return;
        }

        $cutoff = time() - max(3600, $windowSeconds);
        $files = array_merge(glob($this->dir . '/rl-*') ?: [], glob($this->dir . '/id-*') ?: []);
        foreach ($files as $file) {
            $mtime = @filemtime($file);
            if ($mtime !== false && $mtime < $cutoff) {
                @unlink($file);
            }
        }
    }
}
