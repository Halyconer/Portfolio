---
description: Ship the frontend to production (Vercel auto-deploys on push to main).
agent: build
---

Deploy the portfolio frontend (hosted on Vercel — deploys are triggered by
pushing to `main`; there is no deploy script):

1. Make sure the working tree is clean and committed (check `git status` —
   don't deploy uncommitted changes; if there are changes, flag them to the
   user and ask before committing).
2. Run `pnpm build` as a pre-flight — Vercel runs the same `tsc && vite build`,
   and a failure there is a failed deploy.
3. Push to `main` (`git push`). Vercel's GitHub integration auto-builds and
   deploys; progress and logs are in the Vercel dashboard.
4. Confirm the deploy finished, then report the live URL (https://adrianeddy.com).

Note: this only deploys the frontend. The backend (Flask apps on the Pi) is
deployed separately via `docker compose` — see DEPLOYMENT.md.
