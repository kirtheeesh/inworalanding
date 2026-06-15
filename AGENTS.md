# Repository Guidelines

This is a React 19 landing page project for Inwora, built with Vite, Tailwind CSS (v4), and TypeScript. It is optimized for development on Replit.

## Project Structure & Module Organization

The architecture follows a component-driven approach integrated with **shadcn/ui**.

- **`.\src\components\`**: UI components and layout sections.
    - **`.\src\components\ui\`**: Primitive UI components (radix-ui based). Managed via `.\components.json`.
    - **`.\src\components\landing\`**: Domain-specific sections for the landing page (Hero, Services, etc.).
- **`.\src\pages\`**: Top-level page components (e.g., `.\src\pages\LandingPage.tsx`).
- **`.\src\hooks\`**: Custom React hooks (e.g., `use-mobile`, `use-toast`).
- **`.\src\lib\`**: Shared utilities, notably `.\src\lib\utils.ts` for Tailwind class merging (`cn`).
- **`.\public\assets\`**: Static assets like images and branding.

**Routing & State:**
- Routing is managed by `wouter` in `.\src\App.tsx`.
- Data fetching and caching use `@tanstack/react-query`.
- Theme management is handled by `next-themes` via a custom `ThemeProvider`.

## Build, Test, and Development Commands

- **`npm run dev`**: Starts the Vite development server on `0.0.0.0`.
- **`npm run build`**: Generates a production-ready bundle in `.\dist\public`.
- **`npm run serve`**: Previews the production build locally.
- **`npm run typecheck`**: Executes TypeScript type checking without emitting files (`tsc --noEmit`).

## Coding Style & Naming Conventions

- **Language**: TypeScript (Strict Mode).
- **Styling**: Tailwind CSS v4. Use `class-variance-authority` (CVA) for complex component variants.
- **Path Aliases**:
    - `@/*` → `.\src\*`
    - `@assets/*` → `.\public\assets\*` (configured in `vite.config.ts`)
- **Components**: Functional components using PascalCase. Hooks use camelCase with `use` prefix.
- **Icons**: Primarily uses `lucide-react`.

## Commit & Pull Request Guidelines

Commit messages are descriptive and start with a capital letter, typically describing the impact of the change.

**Common Patterns:**
- `Adopt a professional two-color system for the light theme`
- `Enhance website with comprehensive SEO content...`
- `Update website components and dependencies...`
