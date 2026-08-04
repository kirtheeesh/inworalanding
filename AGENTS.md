# Repository Guidelines

This is the Inwora landing site: a **React 19 frontend** (Vite, Tailwind CSS v4, TypeScript) and a **PHP + MySQL backend** that manages the portfolio.

## Project Structure & Module Organization

The repository has two apps side by side; the root holds only shared config (`.gitignore`, `AGENTS.md`, `.replit-artifact/`):

- **`frontend/`** — the Vite app. It is the Vite root and holds `package.json`, so run every npm command from there.
- **`backend/`** — a dependency-free PHP backend (no Composer). It serves a read-only JSON API (`/api/projects`) and an admin panel (`/admin`, default `admin` / `admin123`) for creating and editing portfolio projects, including image uploads. See `backend/README.md` for setup. The frontend reads the API base URL from `frontend/.env` (`VITE_API_BASE_URL`).

Portfolio data lives in MySQL (database `inworalanding`), **not** in the frontend source. The `icon` field stores a lucide icon *name*; the allowed set is duplicated in `backend/src/ProjectRepository.php` (`ICONS`) and `frontend/src/lib/portfolio-data.ts` (`iconMap`) and must stay in sync.

The architecture follows a component-driven approach integrated with **shadcn/ui**.

- **`frontend/src/components/`**: UI components and layout sections.
    - **`frontend/src/components/ui/`**: Primitive UI components (radix-ui based). Managed via `frontend/components.json`.
    - **`frontend/src/components/landing/`**: Domain-specific sections for the landing page (Hero, Services, etc.).
- **`frontend/src/pages/`**: Top-level page components (e.g., `frontend/src/pages/LandingPage.tsx`).
- **`frontend/src/hooks/`**: Custom React hooks (e.g., `use-mobile`, `use-toast`).
- **`frontend/src/lib/`**: Shared utilities, notably `frontend/src/lib/utils.ts` for Tailwind class merging (`cn`).
- **`frontend/public/assets/`**: Static assets like images and branding.

**Routing & State:**
- Routing is managed by `wouter` in `frontend/src/App.tsx`.
- Data fetching and caching use `@tanstack/react-query`.
- Theme management is handled by `next-themes` via a custom `ThemeProvider`.

## Build, Test, and Development Commands

Run these from `frontend/`:

- **`npm run dev`**: Starts the Vite development server on `0.0.0.0`.
- **`npm run build`**: Generates a production-ready bundle in `frontend/dist/public`.
- **`npm run serve`**: Previews the production build locally.
- **`npm run typecheck`**: Executes TypeScript type checking without emitting files (`tsc --noEmit`).

## Coding Style & Naming Conventions

- **Language**: TypeScript (Strict Mode).
- **Styling**: Tailwind CSS v4. Use `class-variance-authority` (CVA) for complex component variants.
- **Path Aliases**:
    - `@/*` → `frontend/src/*`
    - `@assets/*` → `frontend/public/assets/*` (configured in `frontend/vite.config.ts`)
- **Components**: Functional components using PascalCase. Hooks use camelCase with `use` prefix.
- **Icons**: Primarily uses `lucide-react`.

## Commit & Pull Request Guidelines

Commit messages are descriptive and start with a capital letter, typically describing the impact of the change.

**Common Patterns:**
- `Adopt a professional two-color system for the light theme`
- `Enhance website with comprehensive SEO content...`
- `Update website components and dependencies...`
