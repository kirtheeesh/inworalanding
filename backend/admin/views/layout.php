<?php
/** @var string $content */
/** @var string $title */
$success = flash('success');
$error = flash('error');
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title><?= e($title ?? 'Admin') ?> — INWORA Admin</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  :root {
    --bg: #f6f7f9; --card: #fff; --border: #e3e6ea; --text: #16191d;
    --muted: #6b7280; --primary: #0f766e; --primary-dark: #115e57;
    --danger: #b91c1c; --radius: 12px;
  }
  body {
    margin: 0; background: var(--bg); color: var(--text);
    font: 15px/1.55 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  a { color: var(--primary); }
  header.topbar {
    background: #fff; border-bottom: 1px solid var(--border);
    padding: 0 1.5rem; display: flex; align-items: center; gap: 1.5rem;
    height: 60px; position: sticky; top: 0; z-index: 10;
  }
  .brand { font-weight: 800; letter-spacing: .12em; font-size: .85rem; text-transform: uppercase; color: var(--primary); }
  .topbar nav { display: flex; gap: 1rem; margin-left: auto; align-items: center; }
  .topbar .who { color: var(--muted); font-size: .85rem; }
  main { max-width: 1040px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }
  h1 { font-size: 1.6rem; margin: 0; }
  .page-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem; flex-wrap: wrap; }
  .page-head .spacer { margin-left: auto; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); }
  .alert { padding: .8rem 1rem; border-radius: var(--radius); margin-bottom: 1.25rem; font-size: .92rem; }
  .alert-success { background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; }
  .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: var(--danger); }
  .btn {
    display: inline-flex; align-items: center; gap: .45rem; border: 1px solid transparent;
    background: var(--primary); color: #fff; padding: .55rem 1.1rem; border-radius: 9px;
    font-size: .9rem; font-weight: 600; cursor: pointer; text-decoration: none; font-family: inherit;
  }
  .btn:hover { background: var(--primary-dark); }
  .btn-outline { background: #fff; color: var(--text); border-color: var(--border); }
  .btn-outline:hover { background: #f3f4f6; }
  .btn-danger { background: #fff; color: var(--danger); border-color: #fecaca; }
  .btn-danger:hover { background: #fef2f2; }
  .btn-sm { padding: .35rem .75rem; font-size: .82rem; }
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; padding: .8rem 1rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
  th { font-size: .72rem; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
  tbody tr:last-child td { border-bottom: 0; }
  .thumb { width: 68px; height: 44px; object-fit: cover; border-radius: 7px; border: 1px solid var(--border); background: #eef0f3; display: block; }
  .pill { display: inline-block; padding: .18rem .6rem; border-radius: 999px; font-size: .7rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
  .pill-on { background: #ecfdf5; color: #065f46; }
  .pill-off { background: #f3f4f6; color: var(--muted); }
  .muted { color: var(--muted); }
  .empty { padding: 3.5rem 1rem; text-align: center; color: var(--muted); }
  label { display: block; font-weight: 600; font-size: .85rem; margin-bottom: .35rem; }
  .hint { font-weight: 400; color: var(--muted); font-size: .8rem; }
  input[type=text], input[type=url], input[type=number], input[type=password], textarea, select {
    width: 100%; padding: .6rem .75rem; border: 1px solid var(--border); border-radius: 9px;
    font: inherit; font-size: .92rem; background: #fff; color: var(--text);
  }
  input:focus, textarea:focus, select:focus { outline: 2px solid var(--primary); outline-offset: -1px; border-color: var(--primary); }
  input[type=file] { font-size: .85rem; }
  textarea { resize: vertical; min-height: 90px; }
  .field { margin-bottom: 1.15rem; }
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1.15rem; }
  fieldset { border: 1px solid var(--border); border-radius: var(--radius); padding: 1.35rem; margin: 0 0 1.5rem; background: #fff; }
  legend { font-weight: 700; font-size: .78rem; text-transform: uppercase; letter-spacing: .09em; color: var(--muted); padding: 0 .4rem; }
  .checkbox { display: flex; align-items: center; gap: .5rem; }
  .checkbox input { width: 16px; height: 16px; }
  .checkbox label { margin: 0; }
  .actions { display: flex; gap: .75rem; align-items: center; flex-wrap: wrap; }
  .login-wrap { max-width: 380px; margin: 8vh auto; }
  @media (max-width: 640px) {
    .hide-sm { display: none; }
    main { padding: 1.25rem 1rem 3rem; }
  }
</style>
</head>
<body>
<?php if (Auth::check()): ?>
  <header class="topbar">
    <span class="brand">INWORA Admin</span>
    <nav>
      <a href="<?= e(url('/admin/projects')) ?>">Projects</a>
      <a href="<?= e(rtrim(env('FRONTEND_URL', '') ?: '#', '/')) ?>" target="_blank" rel="noopener">View site</a>
      <span class="who hide-sm">Signed in as <strong><?= e(Auth::username()) ?></strong></span>
      <form method="post" action="<?= e(url('/admin/logout')) ?>" style="margin:0">
        <input type="hidden" name="_csrf" value="<?= e(csrf_token()) ?>">
        <button class="btn btn-outline btn-sm" type="submit">Sign out</button>
      </form>
    </nav>
  </header>
<?php endif; ?>

<main>
  <?php if ($success): ?><div class="alert alert-success"><?= e($success) ?></div><?php endif; ?>
  <?php if ($error): ?><div class="alert alert-error"><?= e($error) ?></div><?php endif; ?>
  <?= $content ?>
</main>
</body>
</html>
