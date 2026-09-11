<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/helpers.php';
require_once dirname(__DIR__) . '/src/Auth.php';
require_once dirname(__DIR__) . '/src/ProjectRepository.php';
require_once dirname(__DIR__) . '/src/ProductRepository.php';
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

    // "No video" / "YouTube link" / "Upload video file" — only one wins.
    $videoMode = post('video_mode', 'none');
    $videoMode = in_array($videoMode, ProjectRepository::VIDEO_MODES, true) ? $videoMode : 'none';

    $data = [
        'slug'         => $repo->uniqueSlug(slugify($slugInput), $id),
        'title'        => $title,
        'category'     => post('category'),
        'short_desc'   => post('short_desc'),
        'full_desc'    => post('full_desc'),
        'icon'         => in_array($icon, ProjectRepository::ICONS, true) ? $icon : 'Layout',
        'video_type'   => null,
        'video_url'    => null,
        'video_file'   => $videoMode === 'upload' ? ($existing['video_file'] ?? null) : null,
        'pdf_url'      => post('pdf_url'),
        'live_url'     => post('live_url'),
        'sort_order'   => (int) post('sort_order', '0'),
        'is_published' => isset($_POST['is_published']) ? 1 : 0,
    ];

    if ($videoMode === 'youtube') {
        $yt = post('video_url');
        if ($yt !== '') {
            $data['video_type'] = 'youtube';
            $data['video_url'] = youtube_embed_url($yt);
        }
    } elseif ($videoMode === 'upload') {
        $data['video_type'] = 'upload';
    }

    $uploader = new FileUploader();
    $videoMaxBytes = env_int('VIDEO_MAX_BYTES', 20 * 1024 * 1024);

    try {
        if ($videoMode === 'upload' && FileUploader::wasProvided($_FILES['video_file'] ?? null)) {
            // An uploaded file always beats whatever was there before.
            $data['video_file'] = $uploader->store($_FILES['video_file'], FileUploader::VIDEO_TYPES, $videoMaxBytes);
        }

        if (FileUploader::wasProvided($_FILES['pdf_file'] ?? null)) {
            $data['pdf_url'] = $uploader->store($_FILES['pdf_file'], FileUploader::PDF_TYPES);
        }
    } catch (RuntimeException $e) {
        flash('error', $e->getMessage());
        redirect($id ? "/admin/projects/$id/edit" : '/admin/projects/create');
    }

    // "Upload" was selected but no file was ever provided (e.g. a brand new
    // project with nothing chosen yet) — that's not a video, so don't save one.
    if ($data['video_type'] === 'upload' && !$data['video_file']) {
        $data['video_type'] = null;
    }

    // ── Banner slides ────────────────────────────────────────
    // Existing slides (kept, reprioritized, or removed) + newly added ones.
    $existingBannersById = [];
    foreach ($existing['banners'] ?? [] as $b) {
        $existingBannersById[$b['id']] = $b['image'];
    }
    $removeIds = array_map('intval', $_POST['banner_remove'] ?? []);

    $banners = [];
    $keptImages = [];

    $existingIds = $_POST['banner_existing_id'] ?? [];
    $existingPriorities = $_POST['banner_existing_priority'] ?? [];
    foreach ($existingIds as $i => $eid) {
        $eid = (int) $eid;
        if (!isset($existingBannersById[$eid]) || in_array($eid, $removeIds, true)) {
            continue;
        }
        $banners[] = [
            'image'      => $existingBannersById[$eid],
            'sort_order' => (int) ($existingPriorities[$i] ?? 0),
        ];
        $keptImages[] = $existingBannersById[$eid];
    }

    try {
        $newFiles = files_array('banner_new_file');
        $newUrls = $_POST['banner_new_url'] ?? [];
        $newPriorities = $_POST['banner_new_priority'] ?? [];
        $slotCount = max(count($newFiles), count($newUrls), count($newPriorities));

        for ($i = 0; $i < $slotCount; $i++) {
            $image = null;

            if (FileUploader::wasProvided($newFiles[$i] ?? null)) {
                $image = $uploader->store($newFiles[$i], FileUploader::IMAGE_TYPES);
            } elseif (trim((string) ($newUrls[$i] ?? '')) !== '') {
                $image = trim($newUrls[$i]);
            }

            if ($image === null) {
                continue; // an empty slide slot — nothing was added here
            }

            $banners[] = [
                'image'      => $image,
                // New slides default to the back of the line unless given a priority.
                'sort_order' => (int) ($newPriorities[$i] ?? (100 + $i)),
            ];
        }
    } catch (RuntimeException $e) {
        flash('error', $e->getMessage());
        redirect($id ? "/admin/projects/$id/edit" : '/admin/projects/create');
    }

    $newId = $repo->save($id, $data, post_lines('tags'), post_lines('features'), $banners);

    // Once the row is safely written, drop any upload it no longer points at —
    // whether it was replaced, removed from the slider, or swapped for a URL.
    if ($existing !== null) {
        foreach ($existingBannersById as $eid => $image) {
            if (!in_array($image, $keptImages, true)) {
                $uploader->delete($image);
            }
        }
        if (($existing['video_file'] ?? null) !== $data['video_file']) {
            $uploader->delete($existing['video_file']);
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
    foreach ($project['banners'] as $banner) {
        $uploader->delete($banner['image']);
    }
    $uploader->delete($project['video_file'] ?? null);
    $uploader->delete($project['pdf_url']);

    flash('success', sprintf('Project "%s" deleted.', $project['title']));
    redirect('/admin/projects');
}

// ── Products ─────────────────────────────────────────────────

function admin_products_index(): void
{
    $repo = new ProductRepository();

    view('products', [
        'title'    => 'Products',
        'products' => $repo->all(),
    ]);
}

function admin_product_form(?int $id): void
{
    $repo = new ProductRepository();
    $product = null;

    if ($id !== null) {
        $product = $repo->findById($id);
        if (!$product) {
            flash('error', 'That product no longer exists.');
            redirect('/admin/products');
        }
    }

    view('product-form', [
        'title'   => $product ? 'Edit product' : 'New product',
        'product' => $product,
    ]);
}

function admin_product_save(?int $id): void
{
    csrf_verify();

    $repo = new ProductRepository();
    $existing = $id !== null ? $repo->findById($id) : null;

    if ($id !== null && !$existing) {
        flash('error', 'That product no longer exists.');
        redirect('/admin/products');
    }

    $title = post('title');
    if ($title === '') {
        flash('error', 'Title is required.');
        redirect($id ? "/admin/products/$id/edit" : '/admin/products/create');
    }

    $slugInput = post('slug') !== '' ? post('slug') : $title;
    // The form no longer exposes an icon picker (it only matters as a fallback for
    // icon-only cards), so an edit preserves whatever the product already has.
    $icon = post('icon', $existing['icon'] ?? 'Boxes');

    // "No video" / "YouTube link" / "Upload video file" — only one wins.
    $videoMode = post('video_mode', 'none');
    $videoMode = in_array($videoMode, ProductRepository::VIDEO_MODES, true) ? $videoMode : 'none';

    $data = [
        'slug'           => $repo->uniqueSlug(slugify($slugInput), $id),
        'title'          => $title,
        'subtitle'       => post('subtitle'),
        'badge'          => post('badge'),
        'tagline'        => post('tagline'),
        'description'    => post('description'),
        'overview'       => post('overview'),
        'icon'           => in_array($icon, ProductRepository::ICONS, true) ? $icon : 'Boxes',
        'video_type'     => null,
        'video_url'      => null,
        'video_file'     => $videoMode === 'upload' ? ($existing['video_file'] ?? null) : null,
        'live_url'       => post('live_url'),
        'play_store_url' => post('play_store_url'),
        'is_featured'    => isset($_POST['is_featured']) ? 1 : 0,
        'sort_order'     => (int) post('sort_order', '0'),
        'is_published'   => isset($_POST['is_published']) ? 1 : 0,
    ];

    if ($videoMode === 'youtube') {
        $yt = post('video_url');
        if ($yt !== '') {
            $data['video_type'] = 'youtube';
            $data['video_url'] = youtube_embed_url($yt);
        }
    } elseif ($videoMode === 'upload') {
        $data['video_type'] = 'upload';
    }

    $uploader = new FileUploader();
    $videoMaxBytes = env_int('VIDEO_MAX_BYTES', 20 * 1024 * 1024);

    try {
        if ($videoMode === 'upload' && FileUploader::wasProvided($_FILES['video_file'] ?? null)) {
            $data['video_file'] = $uploader->store($_FILES['video_file'], FileUploader::VIDEO_TYPES, $videoMaxBytes);
        }
    } catch (RuntimeException $e) {
        flash('error', $e->getMessage());
        redirect($id ? "/admin/products/$id/edit" : '/admin/products/create');
    }

    // "Upload" was selected but no file was ever provided — that's not a video.
    if ($data['video_type'] === 'upload' && !$data['video_file']) {
        $data['video_type'] = null;
    }

    // ── Banner slides ────────────────────────────────────────
    $existingBannersById = [];
    foreach ($existing['banners'] ?? [] as $b) {
        $existingBannersById[$b['id']] = $b['image'];
    }
    $removeIds = array_map('intval', $_POST['banner_remove'] ?? []);

    $banners = [];
    $keptImages = [];

    $existingIds = $_POST['banner_existing_id'] ?? [];
    $existingPriorities = $_POST['banner_existing_priority'] ?? [];
    foreach ($existingIds as $i => $eid) {
        $eid = (int) $eid;
        if (!isset($existingBannersById[$eid]) || in_array($eid, $removeIds, true)) {
            continue;
        }
        $banners[] = [
            'image'      => $existingBannersById[$eid],
            'sort_order' => (int) ($existingPriorities[$i] ?? 0),
        ];
        $keptImages[] = $existingBannersById[$eid];
    }

    try {
        $newFiles = files_array('banner_new_file');
        $newUrls = $_POST['banner_new_url'] ?? [];
        $newPriorities = $_POST['banner_new_priority'] ?? [];
        $slotCount = max(count($newFiles), count($newUrls), count($newPriorities));

        for ($i = 0; $i < $slotCount; $i++) {
            $image = null;

            if (FileUploader::wasProvided($newFiles[$i] ?? null)) {
                $image = $uploader->store($newFiles[$i], FileUploader::IMAGE_TYPES);
            } elseif (trim((string) ($newUrls[$i] ?? '')) !== '') {
                $image = trim($newUrls[$i]);
            }

            if ($image === null) {
                continue; // an empty slide slot — nothing was added here
            }

            $banners[] = [
                'image'      => $image,
                'sort_order' => (int) ($newPriorities[$i] ?? (100 + $i)),
            ];
        }
    } catch (RuntimeException $e) {
        flash('error', $e->getMessage());
        redirect($id ? "/admin/products/$id/edit" : '/admin/products/create');
    }

    $newId = $repo->save($id, $data, post_lines('features'), $banners);

    // Once the row is safely written, drop any upload it no longer points at.
    if ($existing !== null) {
        foreach ($existingBannersById as $eid => $image) {
            if (!in_array($image, $keptImages, true)) {
                $uploader->delete($image);
            }
        }
        if (($existing['video_file'] ?? null) !== $data['video_file']) {
            $uploader->delete($existing['video_file']);
        }
    }

    flash('success', $id === null
        ? sprintf('Product "%s" created.', $data['title'])
        : sprintf('Product "%s" updated.', $data['title']));

    redirect("/admin/products/$newId/edit");
}

function admin_product_delete(int $id): void
{
    csrf_verify();

    $repo = new ProductRepository();
    $product = $repo->findById($id);

    if (!$product) {
        flash('error', 'That product no longer exists.');
        redirect('/admin/products');
    }

    $repo->delete($id);

    $uploader = new FileUploader();
    foreach ($product['banners'] as $banner) {
        $uploader->delete($banner['image']);
    }
    $uploader->delete($product['video_file'] ?? null);

    flash('success', sprintf('Product "%s" deleted.', $product['title']));
    redirect('/admin/products');
}
