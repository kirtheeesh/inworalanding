<?php
/** @var array|null $project */
$isEdit = $project !== null;
$action = $isEdit ? url('/admin/projects/' . $project['id']) : url('/admin/projects');
$val = static fn (string $key, string $default = '') => e((string) ($project[$key] ?? $default));
$videoMode = $project['video_type'] ?? 'none';
if ($videoMode === '' || $videoMode === null) {
    $videoMode = 'none';
}
$banners = $project['banners'] ?? [];
$mobileBanners = $project['mobile_banners'] ?? [];
?>
<style>
  .banner-slide {
    display: flex; align-items: flex-end; gap: .9rem; padding: .85rem 0;
    border-bottom: 1px solid var(--border);
  }
  .banner-slide:last-child { border-bottom: 0; }
  .banner-slide .thumb { width: 96px; height: 64px; flex-shrink: 0; }
  .banner-slide .field { flex: 1; margin: 0; min-width: 0; }
  .banner-slide .field-priority { flex: 0 0 90px; }
  .banner-slide .checkbox { flex-shrink: 0; white-space: nowrap; }
  .video-mode-options { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1rem; }
  .video-mode-options label { display: inline-flex; align-items: center; gap: .4rem; margin: 0; font-weight: 500; }
  .video-mode-options input { width: auto; }
</style>

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
        <label for="category">Category <span class="hint">— powers the filter chips on the public portfolio page</span></label>
        <input type="text" id="category" name="category" value="<?= $val('category') ?>" placeholder="SaaS Product">
      </div>
    </div>

    <div class="field">
      <label for="short_desc">Short description <span class="hint">— shown on the portfolio card</span></label>
      <textarea id="short_desc" name="short_desc" rows="2"><?= $val('short_desc') ?></textarea>
    </div>

    <div class="field">
      <label for="full_desc">Overview <span class="hint">— the full project description shown on the project detail page</span></label>
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
        <label for="sort_order">Sort order <span class="hint">— lower shows first in the projects list</span></label>
        <input type="number" id="sort_order" name="sort_order" value="<?= $val('sort_order', '0') ?>">
      </div>
    </div>

    <div class="checkbox-group" style="display:flex;flex-wrap:wrap;gap:1.5rem;margin-top:.5rem">
      <div class="checkbox">
        <input type="checkbox" id="is_published" name="is_published" value="1"
               <?= (!$isEdit || $project['is_published']) ? 'checked' : '' ?>>
        <label for="is_published">Published <span class="hint">— unpublished projects are hidden from the website</span></label>
      </div>
      <div class="checkbox">
        <input type="checkbox" id="show_web_view" name="show_web_view" value="1"
               <?= ($project['show_web_view'] ?? 1) ? 'checked' : '' ?>>
        <label for="show_web_view">Enable Web view <span class="hint">— shows the banner/web screenshot slideshow</span></label>
      </div>
      <div class="checkbox">
        <input type="checkbox" id="show_mobile_view" name="show_mobile_view" value="1"
               <?= ($project['show_mobile_view'] ?? 0) ? 'checked' : '' ?>>
        <label for="show_mobile_view">Enable Mobile view <span class="hint">— shows phone mockup screenshots</span></label>
      </div>
    </div>
  </fieldset>

  <fieldset>
    <legend>Web view — banner image slider</legend>
    <p class="hint" style="margin:0 0 1.1rem">
      Add one or more images for the <strong>Web view</strong> (desktop banner slideshow). Requires "Enable Web view" checked above.
      <strong>Priority</strong> controls slide order — lower numbers show first, and the lowest becomes the portfolio card cover.
    </p>

    <div id="banner-slides">
      <?php foreach ($banners as $banner): ?>
        <div class="banner-slide">
          <img class="thumb" src="<?= e(url($banner['image'])) ?>" alt="">
          <input type="hidden" name="banner_existing_id[]" value="<?= (int) $banner['id'] ?>">
          <div class="field field-priority">
            <label>Priority</label>
            <input type="number" name="banner_existing_priority[]" value="<?= (int) $banner['sort_order'] ?>">
          </div>
          <label class="checkbox">
            <input type="checkbox" name="banner_remove[]" value="<?= (int) $banner['id'] ?>">
            Remove
          </label>
        </div>
      <?php endforeach; ?>
    </div>

    <div id="banner-new-slides">
      <div class="banner-slide banner-slide-new">
        <div class="field">
          <label>Image file</label>
          <input type="file" name="banner_new_file[]" accept="image/*">
        </div>
        <div class="field">
          <label>…or image URL</label>
          <input type="text" name="banner_new_url[]" placeholder="https://images.unsplash.com/photo-...">
        </div>
        <div class="field field-priority">
          <label>Priority</label>
          <input type="number" name="banner_new_priority[]" value="<?= count($banners) * 10 ?>">
        </div>
      </div>
    </div>

    <p style="margin:.9rem 0 0">
      <button type="button" class="btn btn-outline btn-sm" id="banner-add-btn">+ Add another slide</button>
    </p>

    <template id="banner-slide-template">
      <div class="banner-slide banner-slide-new">
        <div class="field">
          <label>Image file</label>
          <input type="file" name="banner_new_file[]" accept="image/*">
        </div>
        <div class="field">
          <label>…or image URL</label>
          <input type="text" name="banner_new_url[]" placeholder="https://images.unsplash.com/photo-...">
        </div>
        <div class="field field-priority">
          <label>Priority</label>
          <input type="number" name="banner_new_priority[]" value="0">
        </div>
        <button type="button" class="btn btn-outline btn-sm banner-remove-new">✕</button>
      </div>
    </template>
  </fieldset>

  <fieldset>
    <legend>Mobile view — phone screenshots</legend>
    <p class="hint" style="margin:0 0 1.1rem">
      Upload portrait phone screenshots for the <strong>Mobile view</strong> gallery (shown as phone mockups on the case study page). Requires "Enable Mobile view" checked in Basics above.
    </p>

    <div id="mobile-banner-slides">
      <?php foreach ($mobileBanners as $banner): ?>
        <div class="banner-slide">
          <img class="thumb" src="<?= e(url($banner['image'])) ?>" alt="">
          <input type="hidden" name="mobile_banner_existing_id[]" value="<?= (int) $banner['id'] ?>">
          <div class="field field-priority">
            <label>Priority</label>
            <input type="number" name="mobile_banner_existing_priority[]" value="<?= (int) $banner['sort_order'] ?>">
          </div>
          <label class="checkbox">
            <input type="checkbox" name="mobile_banner_remove[]" value="<?= (int) $banner['id'] ?>">
            Remove
          </label>
        </div>
      <?php endforeach; ?>
    </div>

    <div id="mobile-banner-new-slides">
      <div class="banner-slide banner-slide-new">
        <div class="field">
          <label>Screenshot file</label>
          <input type="file" name="mobile_banner_new_file[]" accept="image/*">
        </div>
        <div class="field">
          <label>…or image URL</label>
          <input type="text" name="mobile_banner_new_url[]" placeholder="https://...">
        </div>
        <div class="field field-priority">
          <label>Priority</label>
          <input type="number" name="mobile_banner_new_priority[]" value="<?= count($mobileBanners) * 10 ?>">
        </div>
      </div>
    </div>

    <p style="margin:.9rem 0 0">
      <button type="button" class="btn btn-outline btn-sm" id="mobile-banner-add-btn">+ Add another screenshot</button>
    </p>

    <template id="mobile-banner-slide-template">
      <div class="banner-slide banner-slide-new">
        <div class="field">
          <label>Screenshot file</label>
          <input type="file" name="mobile_banner_new_file[]" accept="image/*">
        </div>
        <div class="field">
          <label>…or image URL</label>
          <input type="text" name="mobile_banner_new_url[]" placeholder="https://...">
        </div>
        <div class="field field-priority">
          <label>Priority</label>
          <input type="number" name="mobile_banner_new_priority[]" value="0">
        </div>
        <button type="button" class="btn btn-outline btn-sm mobile-banner-remove-new">✕</button>
      </div>
    </template>
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
    <legend>Demo video</legend>
    <p class="hint" style="margin:0 0 1.1rem">A YouTube link <strong>or</strong> an uploaded video file — never both.</p>

    <div class="video-mode-options">
      <label>
        <input type="radio" name="video_mode" value="none" <?= $videoMode === 'none' ? 'checked' : '' ?>>
        No video
      </label>
      <label>
        <input type="radio" name="video_mode" value="youtube" <?= $videoMode === 'youtube' ? 'checked' : '' ?>>
        YouTube link
      </label>
      <label>
        <input type="radio" name="video_mode" value="upload" <?= $videoMode === 'upload' ? 'checked' : '' ?>>
        Upload video file
      </label>
    </div>

    <div id="video-panel-youtube" <?= $videoMode !== 'youtube' ? 'hidden' : '' ?>>
      <div class="field">
        <label for="video_url">YouTube URL</label>
        <input type="text" id="video_url" name="video_url"
               value="<?= $videoMode === 'youtube' ? $val('video_url') : '' ?>"
               placeholder="https://www.youtube.com/watch?v=...">
      </div>
    </div>

    <div id="video-panel-upload" <?= $videoMode !== 'upload' ? 'hidden' : '' ?>>
      <?php if (($project['video_file'] ?? '') !== ''): ?>
        <div class="field">
          <video src="<?= e(url($project['video_file'])) ?>" controls
                 style="width:100%;max-width:420px;border-radius:10px;border:1px solid var(--border);display:block;background:#000"></video>
        </div>
      <?php endif; ?>
      <div class="field">
        <label for="video_file">Video file <span class="hint">— MP4, WebM, Ogg or MOV. Replaces the current one.</span></label>
        <input type="file" id="video_file" name="video_file" accept="video/*">
      </div>
    </div>
  </fieldset>

  <fieldset>
    <legend>Live server &amp; presentation</legend>

    <div class="field">
      <label for="live_url">Live server URL <span class="hint">— redirects visitors here from a "Visit website" button</span></label>
      <input type="text" id="live_url" name="live_url" value="<?= $val('live_url') ?>" placeholder="https://gold.inwora.com">
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

<script>
(function () {
  // ── Web banner slides ─────────────────────────────
  var addBtn = document.getElementById('banner-add-btn');
  var template = document.getElementById('banner-slide-template');
  var container = document.getElementById('banner-new-slides');

  if (addBtn && template && container) {
    addBtn.addEventListener('click', function () {
      container.appendChild(template.content.cloneNode(true));
    });
  }

  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('banner-remove-new')) {
      var row = e.target.closest('.banner-slide');
      if (row) row.remove();
    }
  });

  // ── Mobile banner slides ────────────────────────────
  var mobileAddBtn   = document.getElementById('mobile-banner-add-btn');
  var mobileTemplate = document.getElementById('mobile-banner-slide-template');
  var mobileContainer = document.getElementById('mobile-banner-new-slides');

  if (mobileAddBtn && mobileTemplate && mobileContainer) {
    mobileAddBtn.addEventListener('click', function () {
      mobileContainer.appendChild(mobileTemplate.content.cloneNode(true));
    });
  }

  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('mobile-banner-remove-new')) {
      var row = e.target.closest('.banner-slide');
      if (row) row.remove();
    }
  });

  // ── Video mode panels ───────────────────────────────
  var radios = document.querySelectorAll('input[name="video_mode"]');
  var panels = {
    youtube: document.getElementById('video-panel-youtube'),
    upload: document.getElementById('video-panel-upload'),
  };

  function syncVideoPanels() {
    var selected = document.querySelector('input[name="video_mode"]:checked');
    var mode = selected ? selected.value : 'none';
    Object.keys(panels).forEach(function (key) {
      if (panels[key]) panels[key].hidden = key !== mode;
    });
  }

  radios.forEach(function (r) { r.addEventListener('change', syncVideoPanels); });
  syncVideoPanels();
})();
</script>
