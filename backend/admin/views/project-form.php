<?php
/** @var array|null $project */
$isEdit = $project !== null;
$action = $isEdit ? url('/admin/projects/' . $project['id']) : url('/admin/projects');
$val = static fn (string $key, string $default = '') => e((string) ($project[$key] ?? $default));
?>
<div class="page-head">
  <h1><?= $isEdit ? 'Edit project' : 'New project' ?></h1>
  <span class="spacer"></span>
  <a class="btn btn-outline" href="<?= e(url('/admin/projects')) ?>">← Back to list</a>
</div>

<form method="post" action="<?= e($action) ?>" enctype="multipart/form-data">
  <input type="hidden" name="_csrf" value="<?= e(csrf_token()) ?>">

  <fieldset>
    <legend>Basics</legend>

    <div class="field">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" value="<?= $val('title') ?>" required>
    </div>

    <div class="grid-2">
      <div class="field">
        <label for="slug">URL slug <span class="hint">— leave blank to generate from the title</span></label>
        <input type="text" id="slug" name="slug" value="<?= $val('slug') ?>" placeholder="gold-poster">
      </div>
      <div class="field">
        <label for="category">Category</label>
        <input type="text" id="category" name="category" value="<?= $val('category') ?>" placeholder="SaaS Product">
      </div>
    </div>

    <div class="field">
      <label for="short_desc">Short description <span class="hint">— shown on the portfolio card</span></label>
      <textarea id="short_desc" name="short_desc" rows="2"><?= $val('short_desc') ?></textarea>
    </div>

    <div class="field">
      <label for="full_desc">Full description <span class="hint">— shown on the project detail page</span></label>
      <textarea id="full_desc" name="full_desc" rows="6"><?= $val('full_desc') ?></textarea>
    </div>

    <div class="grid-2">
      <div class="field">
        <label for="icon">Icon</label>
        <select id="icon" name="icon">
          <?php foreach (ProjectRepository::ICONS as $icon): ?>
            <option value="<?= e($icon) ?>" <?= ($project['icon'] ?? 'Layout') === $icon ? 'selected' : '' ?>>
              <?= e($icon) ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>
      <div class="field">
        <label for="sort_order">Sort order <span class="hint">— lower shows first</span></label>
        <input type="number" id="sort_order" name="sort_order" value="<?= $val('sort_order', '0') ?>">
      </div>
    </div>

    <div class="checkbox">
      <input type="checkbox" id="is_published" name="is_published" value="1"
             <?= (!$isEdit || $project['is_published']) ? 'checked' : '' ?>>
      <label for="is_published">Published <span class="hint">— unpublished projects are hidden from the website</span></label>
    </div>
  </fieldset>

  <fieldset>
    <legend>Banner image</legend>

    <?php if (($project['banner'] ?? '') !== ''): ?>
      <div class="field">
        <img src="<?= e(url($project['banner'])) ?>" alt="Current banner"
             style="width:100%;max-width:420px;border-radius:10px;border:1px solid var(--border);display:block">
      </div>
    <?php endif; ?>

    <div class="field">
      <label for="banner_file">Upload a new image <span class="hint">— JPG, PNG, WebP, GIF or AVIF. Replaces the current one.</span></label>
      <input type="file" id="banner_file" name="banner_file" accept="image/*">
    </div>

    <div class="field">
      <label for="banner_url">…or use an image URL</label>
      <input type="text" id="banner_url" name="banner_url" value="<?= $val('banner') ?>"
             placeholder="https://images.unsplash.com/photo-...">
      <p class="hint" style="margin:.4rem 0 0">An uploaded file always wins over this field.</p>
    </div>
  </fieldset>

  <fieldset>
    <legend>Tags &amp; features</legend>

    <div class="grid-2">
      <div class="field">
        <label for="tags">Tags <span class="hint">— one per line</span></label>
        <textarea id="tags" name="tags" rows="6" placeholder="React&#10;SaaS&#10;Marketing Automation"><?= e(implode("\n", $project['tags'] ?? [])) ?></textarea>
      </div>
      <div class="field">
        <label for="features">Key features <span class="hint">— one per line</span></label>
        <textarea id="features" name="features" rows="6" placeholder="Real-time Gold Rate Integration&#10;Automated Image Generator"><?= e(implode("\n", $project['features'] ?? [])) ?></textarea>
      </div>
    </div>
  </fieldset>

  <fieldset>
    <legend>Links &amp; media</legend>

    <div class="grid-2">
      <div class="field">
        <label for="live_url">Live site URL</label>
        <input type="text" id="live_url" name="live_url" value="<?= $val('live_url') ?>" placeholder="https://gold.inwora.com">
      </div>
      <div class="field">
        <label for="video_url">Demo video embed URL</label>
        <input type="text" id="video_url" name="video_url" value="<?= $val('video_url') ?>" placeholder="https://www.youtube.com/embed/...">
      </div>
    </div>

    <div class="field">
      <label for="pdf_file">Presentation PDF <span class="hint">— upload to replace the current file</span></label>
      <input type="file" id="pdf_file" name="pdf_file" accept="application/pdf">
    </div>

    <div class="field">
      <label for="pdf_url">…or a PDF URL</label>
      <input type="text" id="pdf_url" name="pdf_url" value="<?= $val('pdf_url') ?>" placeholder="/assets/pdf/deck.pdf">
    </div>
  </fieldset>

  <div class="actions">
    <button class="btn" type="submit"><?= $isEdit ? 'Save changes' : 'Create project' ?></button>
    <a class="btn btn-outline" href="<?= e(url('/admin/projects')) ?>">Cancel</a>
  </div>
</form>
