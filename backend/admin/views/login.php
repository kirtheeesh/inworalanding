<div class="login-wrap">
  <div style="text-align:center;margin-bottom:1.75rem">
    <div class="brand" style="font-weight:800;letter-spacing:.14em;font-size:.8rem;text-transform:uppercase;color:var(--primary)">INWORA</div>
    <h1 style="margin-top:.5rem">Admin sign in</h1>
    <p class="muted" style="margin:.4rem 0 0;font-size:.9rem">Manage the portfolio shown on the website.</p>
  </div>

  <form method="post" action="<?= e(url('/admin/login')) ?>" class="card" style="padding:1.5rem">
    <input type="hidden" name="_csrf" value="<?= e(csrf_token()) ?>">

    <div class="field">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" autocomplete="username" autofocus required>
    </div>

    <div class="field">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" autocomplete="current-password" required>
    </div>

    <button class="btn" type="submit" style="width:100%;justify-content:center">Sign in</button>
  </form>
</div>
