<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/helpers.php';
require_once dirname(__DIR__) . '/src/Auth.php';
require_once dirname(__DIR__) . '/src/ProjectRepository.php';
require_once dirname(__DIR__) . '/src/FileUploader.php';

/** Render a view inside the admin layout and stop. */
function view(string $name, array $data = []): void
{
    extract($data, EXTR_SKIP);

    ob_start();
    require __DIR__ . '/views/' . $name . '.php';
    $content = ob_get_clean();

    require __DIR__ . '/views/layout.php';
    exit;
}

// ── Authentication ───────────────────────────────────────────

function admin_login_form(): void
{
    if (Auth::check()) {
        redirect('/admin/projects');
    }

    view('login', ['title' => 'Sign in']);
}

function admin_login(): void
{
    csrf_verify();

    if (Auth::attempt(post('username'), $_POST['password'] ?? '')) {
        redirect('/admin/projects');
    }

    flash('error', 'Incorrect username or password.');
    redirect('/admin/login');
}

function admin_logout(): void
{
    csrf_verify();
    Auth::logout();
    flash('success', 'You have been signed out.');
    redirect('/admin/login');
}

// ── Projects ─────────────────────────────────────────────────

function admin_projects_index(): void
{
    $repo = new ProjectRepository();

    view('projects', [
        'title'    => 'Portfolio projects',
        'projects' => $repo->all(),
    ]);
}

function admin_project_form(?int $id): void
{
    $repo = new ProjectRepository();
    $project = null;

    if ($id !== null) {
        $project = $repo->findById($id);
        if (!$project) {
            flash('error', 'That project no longer exists.');
            redirect('/admin/projects');
        }
    }

    view('project-form', [
        'title'   => $project ? 'Edit project' : 'New project',
        'project' => $project,
    ]);
}

function admin_project_save(?int $id): void
{
    csrf_verify();

    $repo = new ProjectRepository();
    $existing = $id !== null ? $repo->findById($id) : null;

    if ($id !== null && !$existing) {
        flash('error', 'That project no longer exists.');
        redirect('/admin/projects');
    }

    $title = post('title');
    if ($title === '') {
        flash('error', 'Title is required.');
        redirect($id ? "/admin/projects/$id/edit" : '/admin/projects/create');
    }

    $slugInput = post('slug') !== '' ? post('slug') : $title;
    $icon = post('icon', 'Layout');

    $data = [
        'slug'         => $repo->uniqueSlug(slugify($slugInput), $id),
        'title'        => $title,
        'category'     => post('category'),
        'short_desc'   => post('short_desc'),
        'full_desc'    => post('full_desc'),
        'icon'         => in_array($icon, ProjectRepository::ICONS, true) ? $icon : 'Layout',
        'banner'       => post('banner_url'),
        'video_url'    => post('video_url'),
        'pdf_url'      => post('pdf_url'),
        'live_url'     => post('live_url'),
        'sort_order'   => (int) post('sort_order', '0'),
        'is_published' => isset($_POST['is_published']) ? 1 : 0,
    ];

    $uploader = new FileUploader();

    try {
        if (FileUploader::wasProvided($_FILES['banner_file'] ?? null)) {
            // An uploaded file always beats whatever is in the URL field.
            $data['banner'] = $uploader->store($_FILES['banner_file'], FileUploader::IMAGE_TYPES);
        }

        if (FileUploader::wasProvided($_FILES['pdf_file'] ?? null)) {
            $data['pdf_url'] = $uploader->store($_FILES['pdf_file'], FileUploader::PDF_TYPES);
        }
    } catch (RuntimeException $e) {
        flash('error', $e->getMessage());
        redirect($id ? "/admin/projects/$id/edit" : '/admin/projects/create');
    }

    $newId = $repo->save($id, $data, post_lines('tags'), post_lines('features'));

    // Once the row is safely written, drop any upload it no longer points at —
    // whether it was replaced by a new file, swapped for a URL, or cleared.
    if ($existing !== null) {
        if ($existing['banner'] !== $data['banner']) {
            $uploader->delete($existing['banner']);
        }
        if ($existing['pdf_url'] !== $data['pdf_url']) {
            $uploader->delete($existing['pdf_url']);
        }
    }

    flash('success', $id === null
        ? sprintf('Project "%s" created.', $data['title'])
        : sprintf('Project "%s" updated.', $data['title']));

    redirect("/admin/projects/$newId/edit");
}

function admin_project_delete(int $id): void
{
    csrf_verify();

    $repo = new ProjectRepository();
    $project = $repo->findById($id);

    if (!$project) {
        flash('error', 'That project no longer exists.');
        redirect('/admin/projects');
    }

    $repo->delete($id);

    $uploader = new FileUploader();
    $uploader->delete($project['banner']);
    $uploader->delete($project['pdf_url']);

    flash('success', sprintf('Project "%s" deleted.', $project['title']));
    redirect('/admin/projects');
}
