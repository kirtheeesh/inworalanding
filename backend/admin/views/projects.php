<?php /** @var array $projects */ ?>
<div class="page-head">
  <h1>Portfolio projects</h1>
  <span class="muted"><?= count($projects) ?> total</span>
  <span class="spacer"></span>
  <a class="btn" href="<?= e(url('/admin/projects/create')) ?>">+ New project</a>
</div>

<div class="card">
  <?php if ($projects === []): ?>
    <div class="empty">
      <p>No projects yet.</p>
      <a class="btn" href="<?= e(url('/admin/projects/create')) ?>">Create the first one</a>
    </div>
  <?php else: ?>
    <table>
      <thead>
        <tr>
          <th style="width:88px">Banner</th>
          <th>Project</th>
          <th class="hide-sm">Category</th>
          <th class="hide-sm" style="width:70px">Order</th>
          <th style="width:100px">Status</th>
          <th style="width:150px"></th>
        </tr>
      </thead>
      <tbody>
      <?php foreach ($projects as $project): ?>
        <tr>
          <td>
            <?php if ($project['banner'] !== ''): ?>
              <img class="thumb" src="<?= e(url($project['banner'])) ?>" alt="">
            <?php else: ?>
              <span class="thumb"></span>
            <?php endif; ?>
          </td>
          <td>
            <strong><?= e($project['title']) ?></strong><br>
            <span class="muted" style="font-size:.8rem">/portfolio/<?= e($project['slug']) ?></span>
          </td>
          <td class="hide-sm"><?= e($project['category']) ?></td>
          <td class="hide-sm"><?= (int) $project['sort_order'] ?></td>
          <td>
            <?php if ($project['is_published']): ?>
              <span class="pill pill-on">Live</span>
            <?php else: ?>
              <span class="pill pill-off">Draft</span>
            <?php endif; ?>
          </td>
          <td>
            <div class="actions">
              <a class="btn btn-outline btn-sm" href="<?= e(url('/admin/projects/' . $project['id'] . '/edit')) ?>">Edit</a>
              <form method="post"
                    action="<?= e(url('/admin/projects/' . $project['id'] . '/delete')) ?>"
                    style="margin:0"
                    onsubmit="return confirm('Delete &quot;<?= e(addslashes($project['title'])) ?>&quot;? This cannot be undone.')">
                <input type="hidden" name="_csrf" value="<?= e(csrf_token()) ?>">
                <button class="btn btn-danger btn-sm" type="submit">Delete</button>
              </form>
            </div>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
