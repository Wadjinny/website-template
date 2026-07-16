# website-template

Starter full-stack web app: React + Vite frontend and FastAPI backend. Use it as a scaffold for new `*.w-ilyas.site` projects.

**Live:** [website-template.w-ilyas.site](https://website-template.w-ilyas.site)

## Stack

| Layer | Tools |
| ----- | ----- |
| Frontend | pnpm, Vite 8, React 19, React Router 8, TanStack Query 5, Tailwind CSS 4, TypeScript, oxlint |
| Backend | uv, FastAPI, uvicorn, Pydantic |

Agent-oriented conventions live in [`AGENTS.md`](./AGENTS.md).

## Run locally

**Frontend**

```bash
cd frontend
pnpm install
pnpm dev
```

**Backend** (http://127.0.0.1:1234)

```bash
cd backend
uv sync
uv run main.py
```

## What's included

- Home page + DummyJSON products demo (TanStack Query)
- Sample FastAPI route (`/api` proxied in production via Caddy)
- Class-based dark/light theme
- Docker Compose deploy for the backend (`compose.yml`)

## Deploy

Push to `main` runs `.github/workflows/backend.yml`: build/push the backend image, deploy it over SSH, build the Vite frontend, and install the site Caddyfile.
