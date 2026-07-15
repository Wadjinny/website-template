# AGENTS.md

Instructions for AI agents working in this repository.

## Project overview

A web application
## Tech stack

### Frontend (`frontend/`)

| Concern        | Tool                         | Notes |
| -------------- | ---------------------------- | ----- |
| Package manager| **pnpm**                     | Never use `npm` or `yarn`. Use `pnpm add <pkg>` / `pnpm add -D <pkg>`. |
| Build/dev tool | **Vite** 8                   | Config in `frontend/vite.config.ts`. |
| UI library     | **React** 19                 | Function components + hooks only. |
| Routing        | **React Router** 8 (data mode)| Import from `react-router` (not `react-router-dom`). |
| Server state   | **TanStack Query** 5         | `@tanstack/react-query` for fetching/caching remote data. |
| Styling        | **Tailwind CSS** 4           | Utility-first; via `@tailwindcss/vite` plugin. |
| Language       | **TypeScript** (~6)          | Strict; prefer explicit types on APIs. |
| Linter         | **oxlint**                   | Config in `frontend/.oxlintrc.json`. |

### Backend (`backend/`)

| Concern        | Tool                         | Notes |
| -------------- | ---------------------------- | ----- |
| Package manager| **uv**                       | Never use `pip` or `poetry`. Use `uv add <pkg>` / `uv sync`. Deps/config in `backend/pyproject.toml`; lock in `backend/uv.lock`. |
| Web framework  | **FastAPI**                  | ASGI app defined in `backend/main.py` (`app = FastAPI()`). |
| Language       | **Python**          | Prefer type hints; use Pydantic models for request/response schemas. |

## Commands

### Frontend

Run from `frontend/`:

- `pnpm install` — install dependencies
- `pnpm dev` — start the Vite dev server
- `pnpm build` — type-check (`tsc -b`) then build for production
- `pnpm lint` — run oxlint
- `pnpm preview` — preview the production build

### Backend

Run from `backend/`:

- `uv sync` — create/update the virtualenv from `pyproject.toml` / `uv.lock`
- `uv run main.py` — start the FastAPI dev server (uvicorn with reload) on `127.0.0.1:1234`
- `uv add <pkg>` / `uv add --dev <pkg>` — add a runtime / dev dependency

## Conventions

### Routing (React Router — data mode)

- The router is defined as a config object with `createBrowserRouter` in `frontend/src/router.tsx` and provided via `<RouterProvider>` in `frontend/src/main.tsx`. Do **not** switch to JSX `<Routes>`/`<BrowserRouter>` (component mode).
- Import everything from `react-router` (e.g. `Link`, `NavLink`, `Outlet`, `useLoaderData`, `createBrowserRouter`).
- Page components live in `frontend/src/routes/`. `root.tsx` is the layout (renders `<Outlet />`); `error-page.tsx` is the shared `errorElement`. When adding a route, register it in `router.tsx` and add a `NavLink` in `root.tsx`.

### Data fetching (TanStack Query)

- Use **TanStack Query** (`useQuery` / `useMutation`) for server state — not `useEffect` + `fetch`. The `QueryClientProvider` wraps the app in `frontend/src/main.tsx`.
- Keep HTTP calls in typed modules under `frontend/src/api/` (e.g. `api/products.ts`), and call them from `queryFn`. Don't `fetch` inline in components.
- Use structured, serializable `queryKey`s that include all inputs (e.g. `['products', { q, page }]`) so caching and refetching behave correctly.
- Use `placeholderData: keepPreviousData` for smooth pagination/search transitions.
- Reference API: this project talks to the public [DummyJSON](https://dummyjson.com/docs) API for demo data.

### Styling (Tailwind)

- Style with Tailwind utility classes in JSX `className`. Avoid separate `.css` files and inline `style` objects unless a value can't be expressed with utilities.
- Global styles / Tailwind entry: `frontend/src/index.css` (`@import "tailwindcss";`).
- The accent color is **sky**; slate is the neutral palette. Reuse these for visual consistency.

### Dark / light mode

- Dark mode is **class-based**: `frontend/src/index.css` defines `@custom-variant dark (&:where(.dark, .dark *))`, activated by a `dark` class on `<html>`.
- Theme state lives in `frontend/src/theme.tsx` (`ThemeProvider` + `useTheme`). It persists the choice to `localStorage` (key `theme`), falls back to the OS `prefers-color-scheme`, and toggles the `dark` class on `document.documentElement`. `ThemeProvider` wraps the app in `frontend/src/main.tsx`.
- An inline script in `frontend/index.html` `<head>` applies the stored/preferred theme before React mounts to avoid a flash of the wrong theme. Keep it in sync with `theme.tsx` (storage key and logic).
- Write **light styles as the base and dark styles with the `dark:` variant** (e.g. `bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100`). Every color utility that matters visually should have a `dark:` counterpart.

### Backend (FastAPI)

- The app is created in `backend/main.py` and routers are included there via `app.include_router(...)`.
- Keep endpoints in router modules under `backend/routes/` (e.g. `routes/hello.py` exposes `router = APIRouter()`), and register each router in `main.py`.
- Manage dependencies with **uv** only — add packages with `uv add <pkg>` so `pyproject.toml` and `uv.lock` stay in sync. Do not edit `pyproject.toml` deps by hand or use `pip`.
- Use type hints and Pydantic models for request/response bodies; let FastAPI handle validation and OpenAPI docs.

### General

- TypeScript everywhere in the frontend (`.tsx` for components). No new `.js`/`.jsx` source files.
- Keep components small and composable; one route/page per file.
- Do not add narrating comments; comment only non-obvious intent.
- After edits, ensure `pnpm lint` and `pnpm build` pass.

## Static assets

- Files in `frontend/public/` are served at the site root (`/favicon.ico`, `/manifest.webmanifest`, etc.). The favicon set and web app manifest live here.
