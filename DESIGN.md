# Design system

The site is one editorial product: newsprint palette, Times New Roman,
hairline rules, small-caps labels. This file is the contract for keeping it
consistent. Use the tokens, classes and primitives below instead of inventing
new ones; when something new is genuinely needed, add it here first.

`/e-commerce` is the one exception — it is a self-contained demo of a
different brand (Virellio) and deliberately does not use this system.

## Layers

| What | Where |
| --- | --- |
| Tokens — color, type, layout, breakpoints | `src/index.css` (`@theme`) |
| Semantic classes — labels, links, buttons | `src/index.css` (`@layer components`) |
| Shared primitives — chrome, section, card | `src/components/ui/` |
| Home page sections | `src/components/editorial/` |
| Gallery page | `src/components/creative/` |

Tailwind utilities do the layout; the classes and primitives above cover the
patterns that would otherwise be copy-pasted between components.

## Tokens

Colors — always use the Tailwind name (`bg-paper`, `text-ink`, `border-rule`…):

| Name | Value | Use |
| --- | --- | --- |
| `paper` / `paper-warm` | `#fbfaf6` / `#f3f1ea` | Page background / alternating band and card fill |
| `ink` / `ink-soft` | `#1a1a18` / `#33332f` | Headlines / body prose |
| `muted` / `muted-hi` | `#5f5f58` / `#8a8a82` | Secondary text / placeholders and faint labels |
| `accent` / `accent-deep` | `#000000` / `#4a4a44` | Punctuation, links, hover targets |
| `rule` / `rule-strong` | `#d9d6cd` / `#8a8a82` | Row hairlines / section separators |
| `placeholder` | `#ecead1` | Image loading tint |
| `status-online` / `status-active` | `#3a8c4f` / `#c8801f` | Live / your-turn pips only |

Type — display sizes (`text-display`, `text-cover`, `text-hero`, `text-title`,
`text-heading`) are defined in `index.css`; body and UI copy uses Tailwind's
`text-lg` / `text-base` / `text-sm` / `text-xs`. Small-caps labels use
`.text-eyebrow` (11px, standalone meta lines) or `.text-label` (10px, inline
metadata beside other text).

Layout — `max-w-page` is the centered page column; `.measure` caps prose
columns. Breakpoints: `sm` 600px, `md` 900px, `lg` 1200px.

## Classes

Labels:

- `.text-eyebrow` — standalone meta line, e.g. "§ 01 — The trip so far".
- `.text-label` — inline metadata, e.g. a project's year and stack.

Links:

- `.link-quiet` — muted link that darkens on hover (colophon, asides).
- `.link-underline` — ink prose link with an underline (hero, résumé links).
- `.link-rule` — small-caps link with a bottom hairline for standalone
  actions ("See the rest →", "Close ⎋", "← Back to Portfolio"). Combine with
  `.text-eyebrow` / `.text-label` for typography.

Buttons:

- `.btn-reset` — strips native button chrome; required whenever a `<button>`
  should look like a link or label.
- `.btn-ink` — primary button: solid ink fill, paper text.
- `.card-action` — full-bleed action button in a card footer. Use `Card`'s
  `actions` slot, and separate adjacent actions with `border-l border-rule`.

## Primitives

All in `src/components/ui/`:

- **`<Section>`** — page band. Owns horizontal page padding, the top hairline
  (`divided`, default true) and the warm tint (`warm`). `spacing` is `base`
  (normal page section), `roomy` (case-study pages) or `none` (caller-managed).
- **`<SectionHeading>`** — section `h2` with the standard hairline
  (`rule={false}` to omit) and an optional right-aligned `aside`.
- **`<Card>`** — bordered warm frame for interactive demos: `title`, optional
  `aside`, free content, optional `status` line and full-bleed `actions`
  footer.
- **`<Masthead>` / `<Colophon>`** — the site header and footer, mounted once in
  `App` for every route. Never add page-local headers or footers. The
  colophon's top padding guarantees clearance from the content above it
  (gallery sections have no bottom padding of their own).
- **`<StatusDot>`** — live/offline/probing pip; pass the label as children.
- **`<SectionEyebrow>`** — numbered marker for long-form pages: "§ 01 — Label".

## Rules

1. Every route under `App` renders exactly one `<Masthead>` and one
   `<Colophon>` — both come from `App`, not from pages.
2. Page bands are `<Section>`; sections that flow together (gallery) pass
   `divided={false}`.
3. Section titles are `<SectionHeading>`; don't hand-roll `h2` styles.
4. Editorial surfaces are square: no rounded corners and no drop shadows.
   Exceptions: the résumé document card's lift shadow, the Connect4 modal's
   floating close pill, and the `/e-commerce` demo. Hover is a color/opacity
   shift over ~200ms.
5. Accent is punctuation: the period in headlines, the current nav item,
   hover states.
6. Routes keep the shared chrome even when the page has its own visual
   register (`/creative`, `/dev-roadtrip`).

## Checklist for new UI

- [ ] Tokens/classes from this file only — no new hex colors or one-off sizes.
- [ ] Masthead and colophon untouched (they come from `App`).
- [ ] Sections use `<Section>`, headings use `<SectionHeading>`.
- [ ] Links and buttons use the classes above.
- [ ] `pnpm lint && pnpm build` pass.
