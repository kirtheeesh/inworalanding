<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/config/database.php';
require_once __DIR__ . '/helpers.php';

/**
 * Session-based authentication for the admin panel.
 */
class Auth
{
    public static function attempt(string $username, string $password): bool
    {
        $stmt = db()->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ?');
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            return false;
        }

        session_start_once();
        session_regenerate_id(true);
        $_SESSION['admin_id'] = (int) $user['id'];
        $_SESSION['admin_username'] = $user['username'];

        return true;
    }

    public static function check(): bool
    {
        session_start_once();

        return !empty($_SESSION['admin_id']);
    }

    public static function username(): string
    {
        session_start_once();

        return $_SESSION['admin_username'] ?? '';
    }

    public static function logout(): void
    {
        session_start_once();
        $_SESSION = [];
        session_destroy();
    }

    /** Bounce guests to the login screen. */
    public static function requireLogin(): void
    {
        if (!self::check()) {
            flash('error', 'Please sign in to continue.');
            redirect('/admin/login');
        }
    }
}
