---
description: Build and deploy the frontend to GitHub Pages.
agent: build
---

Deploy the portfolio frontend to GitHub Pages:

1. Make sure the working tree is clean and committed (check `git status` —
   don't deploy uncommitted changes; if there are changes, flag them to the
   user and ask before committing).
2. Run `pnpm deploy` — this runs the predeploy build (`tsc && vite build`) and
   pushes `dist/` to the `gh-pages` branch.
3. Confirm the build succeeded and the deploy finished, then report the live
   URL (https://adrianeddy.com).

Note: this only deploys the frontend. The backend (Flask apps on the Pi) is
deployed separately via `docker compose` — see DEPLOYMENT.md.
