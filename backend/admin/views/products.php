<?php /** @var array $products */ ?>
<div class="page-head">
  <h1>Products</h1>
  <span class="muted"><?= count($products) ?> total</span>
  <span class="spacer"></span>
  <a class="btn" href="<?= e(url('/admin/products/create')) ?>">+ New product</a>
</div>

<div class="card">
  <?php if ($products === []): ?>
    <div class="empty">
      <p>No products yet.</p>
      <a class="btn" href="<?= e(url('/admin/products/create')) ?>">Create the first one</a>
    </div>
  <?php else: ?>
    <table>
      <thead>
        <tr>
          <th style="width:88px">Image</th>
          <th>Product</th>
          <th class="hide-sm">Badge</th>
          <th class="hide-sm" style="width:70px">Order</th>
          <th style="width:100px">Status</th>
          <th style="width:150px"></th>
        </tr>
      </thead>
      <tbody>
      <?php foreach ($products as $product): ?>
        <tr>
          <td>
            <?php if ($product['image'] !== ''): ?>
              <img class="thumb" src="<?= e(url($product['image'])) ?>" alt="">
            <?php else: ?>
              <span class="thumb"></span>
            <?php endif; ?>
          </td>
          <td>
            <strong><?= e($product['title']) ?></strong>
            <?php if ($product['is_featured']): ?><span class="pill pill-on" style="margin-left:.4rem">Most popular</span><?php endif; ?>
            <br>
            <span class="muted" style="font-size:.8rem"><?= e($product['subtitle']) ?></span>
          </td>
          <td class="hide-sm"><?= e($product['badge']) ?></td>
          <td class="hide-sm"><?= (int) $product['sort_order'] ?></td>
          <td>
            <?php if ($product['is_published']): ?>
              <span class="pill pill-on">Live</span>
            <?php else: ?>
              <span class="pill pill-off">Draft</span>
            <?php endif; ?>
          </td>
          <td>
            <div class="actions">
              <a class="btn btn-outline btn-sm" href="<?= e(url('/admin/products/' . $product['id'] . '/edit')) ?>">Edit</a>
              <form method="post"
                    action="<?= e(url('/admin/products/' . $product['id'] . '/delete')) ?>"
                    style="margin:0"
                    onsubmit="return confirm('Delete &quot;<?= e(addslashes($product['title'])) ?>&quot;? This cannot be undone.')">
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
