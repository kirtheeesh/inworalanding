# INWORA backend

A dependency-free PHP + MySQL backend that stores the portfolio projects shown
on the React site and provides an admin panel to manage them.

- **Public API** — read-only JSON the frontend fetches
- **Admin panel** — `login → manage projects`, protected by a session login
- **Uploads** — banner images and presentation PDFs stored under `uploads/`

No Composer, no framework. Requires **PHP 8.0+** (with `pdo_mysql`, `gd`,
`fileinfo`) and **MySQL / MariaDB**.

---

## 1. Configure

```bash
cd backend
cp .env.example .env      # then edit the values
```

Key settings in `.env`:

| Variable | Meaning |
| --- | --- |
| `APP_URL` | Public base URL of this backend. Also the mount point for routing. |
| `FRONTEND_URL` | Where the React site runs (the admin "View site" link). |
| `DB_*` | MySQL host, port, database (`inworalanding`), user, password. |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Seeded admin login. Defaults: `admin` / `admin123`. |
| `CORS_ALLOWED_ORIGINS` | Comma-separated origins allowed to call the API. |
| `UPLOAD_MAX_BYTES` | Max upload size (default 5 MB). |

## 2. Create the database & seed data

Make sure MySQL is running (XAMPP Control Panel → Start MySQL), then:

```bash
php database/install.php
```

This creates the `inworalanding` database and tables, creates the admin user
from `.env`, and seeds the nine starter projects **only if the table is empty**
(safe to re-run). To reset the admin password, change it in `.env` and run the
installer again.

## 3. Run

**Option A — PHP's built-in server** (quickest):

```bash
php -S localhost:8000 -t backend backend/router.php   # from the repo root
```

**Option B — XAMPP / Apache**: point a vhost at `backend/`, or drop the project
in `htdocs` and set `APP_URL=http://localhost/inworalanding/backend`. The
included `.htaccess` handles routing.

Then open **<http://localhost:8000/admin>** and sign in with `admin` / `admin123`.

---

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/projects` | All published projects (frontend list). |
| `GET` | `/api/projects/{slug}` | One published project by slug. |
| `GET` | `/api/health` | Liveness + DB check. |

Responses are `{ "data": ... }` on success, `{ "error": "..." }` on failure.
Image and PDF URLs are returned absolute (built from `APP_URL`).

## Admin panel (`/admin`)

- Sign in at `/admin/login`.
- **Projects list** — every project with live/draft status; edit or delete.
- **New / Edit project** — title, slug, category, descriptions, icon, sort
  order, published toggle, banner (upload **or** URL), tags & features (one per
  line), live URL, demo video embed URL, and a presentation PDF (upload or URL).
- Uploaded files are validated by content (not extension), stored with random
  names in `uploads/`, and cleaned up when replaced or when the project is
  deleted.

Unpublished projects vanish from the public API immediately but stay editable
in the admin panel.

---

## How it connects to the frontend

The React app reads `VITE_API_BASE_URL` (see `frontend/.env`) and fetches
`${VITE_API_BASE_URL}/api/projects`. Any change saved in the admin panel is
reflected on the site on the next load. The `icon` field stores a
[lucide](https://lucide.dev) icon **name**; the list of allowed names lives in
`ProjectRepository::ICONS` and must match `iconMap` in
`frontend/src/lib/portfolio-data.ts`.

## Layout

```
backend/
├── index.php              Front controller (routing)
├── router.php             Router for PHP's built-in server
├── .htaccess              Apache routing + dotfile protection
├── config/                env loader + PDO connection
├── src/                   Auth, ProjectRepository, FileUploader, helpers
├── admin/                 Admin controller + views (server-rendered)
├── database/              schema.sql, seed data, install.php
└── uploads/               User-uploaded images & PDFs (git-ignored)
```
