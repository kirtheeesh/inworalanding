<?php
/** @var array|null $product */
$isEdit = $product !== null;
$action = $isEdit ? url('/admin/products/' . $product['id']) : url('/admin/products');
$val = static fn (string $key, string $default = '') => e((string) ($product[$key] ?? $default));
$videoMode = $product['video_type'] ?? 'none';
if ($videoMode === '' || $videoMode === null) {
    $videoMode = 'none';
}
$banners = $product['banners'] ?? [];
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
  <h1><?= $isEdit ? 'Edit product' : 'New product' ?></h1>
  <span class="spacer"></span>
  <a class="btn btn-outline" href="<?= e(url('/admin/products')) ?>">← Back to list</a>
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
        <input type="text" id="slug" name="slug" value="<?= $val('slug') ?>" placeholder="whatsapp-crm">
      </div>
      <div class="field">
        <label for="badge">Badge <span class="hint">— small pill on the card, e.g. "Marketing CRM"</span></label>
        <input type="text" id="badge" name="badge" value="<?= $val('badge') ?>" placeholder="Business Software">
      </div>
    </div>

    <div class="field">
      <label for="subtitle">Subtitle <span class="hint">— one line under the title on the card</span></label>
      <input type="text" id="subtitle" name="subtitle" value="<?= $val('subtitle') ?>" placeholder="Restaurants, billing & order workflows">
    </div>

    <div class="field">
      <label for="tagline">Tagline <span class="hint">— very short line shown in the Hero product panel</span></label>
      <input type="text" id="tagline" name="tagline" value="<?= $val('tagline') ?>" placeholder="Restaurant billing & kitchen orders">
    </div>

    <div class="field">
      <label for="description">Description <span class="hint">— short paragraph shown on the product card</span></label>
      <textarea id="description" name="description" rows="3"><?= $val('description') ?></textarea>
    </div>

    <div class="field">
      <label for="overview">Overview <span class="hint">— the fuller description shown in the "Learn more" dialog. Leave blank to reuse the description.</span></label>
      <textarea id="overview" name="overview" rows="6"><?= $val('overview') ?></textarea>
    </div>

    <div class="grid-2">
      <div class="field">
        <label for="icon">Icon <span class="hint">— used when no banner image is set</span></label>
        <select id="icon" name="icon">
          <?php foreach (ProductRepository::ICONS as $icon): ?>
            <option value="<?= e($icon) ?>" <?= ($product['icon'] ?? 'Boxes') === $icon ? 'selected' : '' ?>>
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
      <input type="checkbox" id="is_featured" name="is_featured" value="1" <?= ($product['is_featured'] ?? 0) ? 'checked' : '' ?>>
      <label for="is_featured">Most popular <span class="hint">— highlights the card and adds a badge</span></label>
    </div>

    <div class="checkbox" style="margin-top:.6rem">
      <input type="checkbox" id="is_published" name="is_published" value="1"
             <?= (!$isEdit || $product['is_published']) ? 'checked' : '' ?>>
      <label for="is_published">Published <span class="hint">— unpublished products are hidden from the website</span></label>
    </div>
  </fieldset>

  <fieldset>
    <legend>Banner image slider</legend>
    <p class="hint" style="margin:0 0 1.1rem">
      Add one or more images. <strong>Priority</strong> controls slide order — lower numbers show first, and the
      lowest-priority image becomes the card thumbnail (leave empty for an icon-only card).
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
    <legend>Features</legend>

    <div class="field">
      <label for="features">Feature list <span class="hint">— one per line, shown as ticked bullets</span></label>
      <textarea id="features" name="features" rows="6" placeholder="Real-time order management&#10;Kitchen display system (KOT)&#10;Multi-counter support"><?= e(implode("\n", $product['features'] ?? [])) ?></textarea>
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
      <?php if (($product['video_file'] ?? '') !== ''): ?>
        <div class="field">
          <video src="<?= e(url($product['video_file'])) ?>" controls
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
    <legend>Links</legend>

    <div class="grid-2">
      <div class="field">
        <label for="live_url">Live site URL <span class="hint">— shown in the "Learn more" dialog as "Visit live site"</span></label>
        <input type="text" id="live_url" name="live_url" value="<?= $val('live_url') ?>" placeholder="https://construction.inwora.com">
      </div>
      <div class="field">
        <label for="play_store_url">Google Play URL</label>
        <input type="text" id="play_store_url" name="play_store_url" value="<?= $val('play_store_url') ?>" placeholder="https://play.google.com/store/apps/details?id=...">
      </div>
    </div>
  </fieldset>

  <div class="actions">
    <button class="btn" type="submit"><?= $isEdit ? 'Save changes' : 'Create product' ?></button>
    <a class="btn btn-outline" href="<?= e(url('/admin/products')) ?>">Cancel</a>
  </div>
</form>

<script>
(function () {
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
