# AGENTS.md

Instructions for AI coding agents working in this repository.

## What this is

Personal portfolio website (Adrian Eddy — adrianeddy.com) with interactive
demos. Read `README.md` for the top-level overview and `DEPLOYMENT.md` for the
self-hosted backend runbook.

## Personal context (machine-local)

This is a public repo: nothing personal belongs in committed files. Living
personal context for AI sessions lives in `.opencode/personal.md`
(gitignored — it may not exist on a fresh clone; if missing, just proceed)
and, in more depth, in a private, machine-local hub repo wired into opencode
sessions as a project reference (ask Adrian for access; it is never committed
or named here). Read those before
career- or context-sensitive work, and never copy their content into this
repo.

## Architecture

Two halves, deployed separately:

- **Frontend** (`src/`): React 19 + TypeScript + Vite, Tailwind CSS v4 (via
  `@tailwindcss/vite`), Framer Motion, react-router-dom. Deployed to GitHub
  Pages (`pnpm deploy` → gh-pages → `dist/`). Talks to the backend through
  `/api` (dev proxy in `vite.config.ts`) → `https://api.adrianeddy.com`.
- **Backend** (Python Flask, deployed on a Raspberry Pi via docker-compose):
  - `backend/` — lighting control (LIFX bulb) + generated JSON stats
    (`stats.json`, `spotify_stats.json`, `reading.json`).
  - `connectX/` — Connect4 AI game (`/connect4/*` endpoints).
  - `nginx/` — reverse proxy (CORS + path routing) to ports 5001 / 5002.
  - `systemd/` — systemd unit/timer that regenerates reading stats on the Pi.

## Commands

```bash
pnpm install        # install deps
pnpm dev            # start Vite dev server (proxies /api to the live backend)
pnpm build          # tsc && vite build (type-check + production build)
pnpm preview        # preview production build locally
pnpm format         # prettier --write src/
pnpm lint           # prettier --check src/   <-- run after edits
pnpm deploy         # build then push dist/ to GitHub Pages
```

Backend local dev (no Docker): see `backend/README_DEV.md`.

## Conventions

- **Formatting**: Prettier 3.5 with `.prettierrc.json` — 4-space indent, no
  semicolons, single quotes, es5 trailing commas. Run `pnpm lint` after changes;
  `pnpm format` will auto-fix. The repo is checked for formatting on CI-style
  lint, so keep it clean.
- **TypeScript**: strict-ish; always type-check with `pnpm build` (runs `tsc`).
  Prefer `@/` alias imports (maps to `/src`) over relative paths.
- **Component layout**: components live in `src/components/` split into
  `editorial/` (text-heavy site sections) and `creative/` (photo/visual work).
  Reusable UI logic goes in `src/lib/`, custom hooks in `src/hooks/`,
  page-level compositions in `src/pages/`.
- **Data**: static site content lives in `src/data/` as typed TS (see
  `src/data/creativePhotos.ts`, `src/data/projects.ts`). Runtime data fetched
  from the backend is typed in `src/types/` and fetched via
  `src/lib/api.ts` (`apiFetch`), which normalizes errors into `ApiError` kinds.
- **API calls**: route through `src/lib/api.ts` and `useApiResource.ts` — don't
  hand-roll `fetch` in components. Handle aborted requests with `isAbortError`.
- **State**: React context for cross-cutting state (e.g.
  `src/ecommerce/context/CartProvider.tsx`).

## Gotchas

- `/data/` is runtime state (sqlite, generated JSON) served by the backend and
  is never committed. Generated JSON like `reading.json` / `spotify_stats.json`
  is produced by scripts in `backend/` — edit those scripts, not the output.
- CORS is handled entirely in `nginx/nginx.conf` (origin allowlist + preflight
  handling). After editing it on the Pi, restart the nginx container — a full
  `docker restart`, not `nginx -s reload` (single-file bind mount).
- The backend hard-checks `Origin`/`Referer` against `ALLOWED_ORIGIN`. The Vite
  dev proxy overrides these headers (`vite.config.ts`) — keep that intact.
- On the Pi, always run `docker compose` from `~/portfolio` — the `./data`
  bind mount is relative to the cwd you ran it from.
- LIFX bulb env vars (`BULB_IP`, `BULB_MAC`) go stale when the bulb/router
  changes; they're required (broadcast discovery doesn't work on this network).

## AI session setup (opencode)

- `opencode.json` wires four MCP servers: `vercel` and `figma` (remote
  servers bridged via `npx mcp-remote` — OAuth opens in the browser on first
  use), `cloudflare-docs` (open, no auth), and `playwright` (local, for
  screenshots / visual inspection of the site; needs a restart of opencode
  to load). Restart opencode after any
  config change; sessions keep the already-loaded config.
- Subagents live in `.opencode/agent/` — `frontend`, `backend`, and `review`
  — use them for deep-dives in those areas and for a strict pre-commit
  review. Slash commands: `/deploy`, `/format`.
- Secret guards deny reading or writing env files, keys, tokens, and
  credentials in any session. Never weaken them to complete a task; ask
  Adrian for the non-secret value instead.
