<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/config/env.php';

/**
 * Handles banner-image and PDF uploads into backend/uploads/.
 *
 * The stored filename is always generated here — never taken from the client —
 * and the type is decided by sniffing the file contents, not the sent header.
 */
class FileUploader
{
    public const IMAGE_TYPES = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'image/gif'  => 'gif',
        'image/avif' => 'avif',
    ];

    public const PDF_TYPES = [
        'application/pdf' => 'pdf',
    ];

    private string $directory;

    public function __construct(?string $directory = null)
    {
        $this->directory = $directory ?? dirname(__DIR__) . '/uploads';

        if (!is_dir($this->directory)) {
            mkdir($this->directory, 0755, true);
        }
    }

    /**
     * Validate and store one uploaded file.
     *
     * @param  array<string, string> $allowedTypes MIME => extension
     * @return string Path relative to the backend root, e.g. "uploads/a1b2c3.jpg".
     * @throws RuntimeException When the upload is rejected.
     */
    public function store(array $file, array $allowedTypes): string
    {
        $error = $file['error'] ?? UPLOAD_ERR_NO_FILE;

        if ($error === UPLOAD_ERR_INI_SIZE || $error === UPLOAD_ERR_FORM_SIZE) {
            throw new RuntimeException('That file is larger than the server upload limit.');
        }
        if ($error !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'] ?? '')) {
            throw new RuntimeException('The file could not be uploaded. Please try again.');
        }

        $maxBytes = env_int('UPLOAD_MAX_BYTES', 5 * 1024 * 1024);
        if (($file['size'] ?? 0) > $maxBytes) {
            throw new RuntimeException(sprintf('File is too large. Maximum size is %d MB.', (int) round($maxBytes / 1048576)));
        }

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = (string) $finfo->file($file['tmp_name']);

        if (!isset($allowedTypes[$mime])) {
            throw new RuntimeException('Unsupported file type: ' . $mime . '. Allowed: ' . implode(', ', array_keys($allowedTypes)) . '.');
        }

        $filename = bin2hex(random_bytes(16)) . '.' . $allowedTypes[$mime];
        $target = $this->directory . '/' . $filename;

        if (!move_uploaded_file($file['tmp_name'], $target)) {
            throw new RuntimeException('Could not write the uploaded file to disk. Check permissions on backend/uploads.');
        }
        chmod($target, 0644);

        return 'uploads/' . $filename;
    }

    /** True when the form actually submitted a file for this field. */
    public static function wasProvided(?array $file): bool
    {
        return $file !== null && ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE;
    }

    /**
     * Remove a previously stored upload. Ignores external URLs and anything
     * that resolves outside the uploads directory.
     */
    public function delete(?string $relativePath): void
    {
        if (!$relativePath || !str_starts_with($relativePath, 'uploads/')) {
            return;
        }

        $target = realpath(dirname(__DIR__) . '/' . $relativePath);
        $root = realpath($this->directory);

        if ($target && $root && str_starts_with($target, $root . DIRECTORY_SEPARATOR) && is_file($target)) {
            unlink($target);
        }
    }
}
