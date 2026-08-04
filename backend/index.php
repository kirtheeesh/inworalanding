<?php

declare(strict_types=1);

/**
 * Front controller — every request is routed from here.
 *
 *   Public API      GET  /api/projects
 *                   GET  /api/projects/{slug}
 *   Admin panel          /admin/...   (session auth, see admin/controller.php)
 *   Uploaded files       /uploads/... (served directly by the web server)
 */

require_once __DIR__ . '/config/env.php';
require_once __DIR__ . '/src/helpers.php';
require_once __DIR__ . '/src/Auth.php';
require_once __DIR__ . '/src/ProjectRepository.php';
require_once __DIR__ . '/src/FileUploader.php';
require_once __DIR__ . '/admin/controller.php';

$debug = env_bool('APP_DEBUG', false);
ini_set('display_errors', $debug ? '1' : '0');
error_reporting($debug ? E_ALL : E_ALL & ~E_DEPRECATED & ~E_NOTICE);

// ── Resolve the route, independent of where the app is mounted ──
// The mount point comes from APP_URL, so it is identical whether the app is
// served at http://localhost:8000 or http://localhost/inworalanding/backend.
$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$basePath = rtrim(parse_url(env('APP_URL', ''), PHP_URL_PATH) ?: '', '/');
if ($basePath !== '' && str_starts_with($requestPath, $basePath)) {
    $requestPath = substr($requestPath, strlen($basePath));
}
$path = '/' . trim(rawurldecode($requestPath), '/');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

$isApi = str_starts_with($path, '/api');
if ($isApi) {
    apply_cors();
    if ($method === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

try {
    dispatch($path, $method, $isApi);
} catch (Throwable $e) {
    error_log('[inwora] ' . $e->getMessage());
    $message = $debug ? $e->getMessage() : 'Something went wrong on the server.';

    if ($isApi) {
        json_response(['error' => $message], 500);
    }

    http_response_code(500);
    echo '<h1>Server error</h1><pre>' . e($message) . '</pre>';
}

function dispatch(string $path, string $method, bool $isApi): void
{
    // ── Public API ──────────────────────────────────────────
    if ($path === '/api/projects' && $method === 'GET') {
        $repo = new ProjectRepository();
        $projects = array_map([$repo, 'toApiArray'], $repo->all(true));

        json_response(['data' => $projects]);
    }

    if (preg_match('#^/api/projects/([A-Za-z0-9\-_]+)$#', $path, $m) && $method === 'GET') {
        $repo = new ProjectRepository();
        $project = $repo->findBySlug($m[1], true);

        if (!$project) {
            json_response(['error' => 'Project not found.'], 404);
        }

        json_response(['data' => $repo->toApiArray($project)]);
    }

    if ($path === '/api/health' && $method === 'GET') {
        db()->query('SELECT 1');
        json_response(['status' => 'ok', 'database' => env('DB_DATABASE')]);
    }

    if ($isApi) {
        json_response(['error' => 'Unknown endpoint: ' . $path], 404);
    }

    // ── Admin panel ─────────────────────────────────────────
    if ($path === '/admin' || $path === '/admin/') {
        redirect('/admin/projects');
    }

    if ($path === '/admin/login') {
        $method === 'POST' ? admin_login() : admin_login_form();
    }

    if ($path === '/admin/logout' && $method === 'POST') {
        admin_logout();
    }

    if (str_starts_with($path, '/admin')) {
        Auth::requireLogin();

        if ($path === '/admin/projects' && $method === 'GET') {
            admin_projects_index();
        }
        if ($path === '/admin/projects/create' && $method === 'GET') {
            admin_project_form(null);
        }
        if ($path === '/admin/projects' && $method === 'POST') {
            admin_project_save(null);
        }
        if (preg_match('#^/admin/projects/(\d+)/edit$#', $path, $m) && $method === 'GET') {
            admin_project_form((int) $m[1]);
        }
        if (preg_match('#^/admin/projects/(\d+)$#', $path, $m) && $method === 'POST') {
            admin_project_save((int) $m[1]);
        }
        if (preg_match('#^/admin/projects/(\d+)/delete$#', $path, $m) && $method === 'POST') {
            admin_project_delete((int) $m[1]);
        }
    }

    // ── Root: a tiny signpost ───────────────────────────────
    if ($path === '/') {
        header('Content-Type: text/html; charset=utf-8');
        echo '<!doctype html><meta charset="utf-8"><title>INWORA backend</title>'
            . '<body style="font:16px/1.6 system-ui;padding:3rem;max-width:40rem;margin:auto">'
            . '<h1>INWORA backend</h1><p>The API and admin panel are running.</p><ul>'
            . '<li><a href="' . e(url('/admin')) . '">Admin panel</a></li>'
            . '<li><a href="' . e(url('/api/projects')) . '">GET /api/projects</a></li>'
            . '<li><a href="' . e(url('/api/health')) . '">GET /api/health</a></li></ul>';
        exit;
    }

    http_response_code(404);
    echo '<h1>404 — Not found</h1><p>No route matches <code>' . e($path) . '</code>.</p>';
}
