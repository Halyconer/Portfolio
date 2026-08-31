---
description: Format the frontend with Prettier and verify lint passes.
agent: build
---

Run `pnpm format` to auto-fix formatting in `src/` (Prettier with
`.prettierrc.json`: 4-space indent, no semicolons, single quotes, es5 trailing
commas). Then run `pnpm lint` to confirm `prettier --check src/` passes. If any
files remain unformatted, fix them and re-run `pnpm lint` until clean. Report
the files that were changed.
