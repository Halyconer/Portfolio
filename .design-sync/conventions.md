# Working with the Adrian Eddy Portfolio design system

**Aesthetic contract.** This is a newsprint/editorial system: warm off-white paper, near-black ink, fully monochrome. `--color-accent` is pure black by design — emphasis comes from weight and darkness, never hue. All text is Times New Roman (a system font; never load a webfont). Section headers use the `§ NN — LABEL` convention via `SectionEyebrow`.

**No provider needed for styling** — tokens are plain CSS custom properties defined in the shipped stylesheets. Two setup rules:
- `Masthead`, `Projects`, `ProjectsIndex`, `CreativeHero`, `CreativeFooter` render react-router links and must sit inside a Router. The bundle exports `PreviewRouter` (a MemoryRouter wrapper) — wrap with it if your canvas has no router: `<PreviewRouter>…</PreviewRouter>`.
- `LightDemo`, `Connect4Inline`, and `Demos` call a live Raspberry Pi backend. Without it they render their built-in offline-fallback states — that is expected, not broken. `LightDemo` requires an `apiStatus` prop: `{ tone: 'online' | 'offline' | 'probing', label: string }`.

**Styling idiom: Tailwind utilities, but the shipped CSS is compiled** — only classes the portfolio itself uses exist. Never invent arbitrary utilities (they won't resolve). Safe vocabulary:
- Custom utilities: `text-eyebrow`, `text-eyebrow-sm`, `text-label` (mono tracked labels), `measure` (reading width), `btn-reset`, `drop-cap`.
- Type scale: `text-display` (clamp hero size), `text-title`, `text-heading` — pair with `font-serif font-normal text-ink`.
- Palette utilities: `text-ink`, `text-ink-soft`, `text-muted`, `text-muted-hi`, `text-paper`, `text-accent`, `bg-paper`, `bg-paper-warm`, `bg-ink`, `border-rule`, `border-rule-strong`.
- For anything not listed, use inline styles with the tokens: `var(--color-paper)`, `var(--color-paper-warm)`, `var(--color-ink)`, `var(--color-ink-soft)`, `var(--color-muted)`, `var(--color-muted-hi)`, `var(--color-accent)`, `var(--color-accent-deep)`, `var(--color-rule)`, `var(--color-rule-strong)`, `var(--color-placeholder)`, `var(--color-status-online)`.
- Buttons follow the Hero idiom: solid `bg-ink text-paper py-3 px-5 text-sm` primary; `border border-rule-strong text-ink` ghost secondary.

**Where the truth lives.** Read `styles.css` → `_ds_bundle.css` (token definitions on `:root` plus every compiled utility) before styling; each component's API is its `components/<group>/<Name>/<Name>.d.ts` and usage notes are in the sibling `.prompt.md`.

**Assets caveat.** `Hero`, `ResumePDF`, and the photo components reference site assets (`/assets/…`) that don't ship with this bundle; photo components (`PhotoTile`, `FeaturedPlate`, `PhotoSection`, `Lightbox`) take `Photo` objects whose `src` is optional — omit it to get the intentional `--color-placeholder` frame.

**Idiomatic section skeleton:**
```tsx
<section className="bg-paper" style={{ padding: '3rem 2rem' }}>
  <SectionEyebrow numeral="02" label="How it works" className="mb-3" />
  <h2 className="font-serif font-normal text-title text-ink m-0">
    From your browser to the bulb.
  </h2>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 32 }}>
    <MetaField label="Based in">New York City</MetaField>
    <MetaField label="Studying">Economics @ NYU</MetaField>
    <MetaField label="Status"><StatusDot tone="online">Pi online</StatusDot></MetaField>
  </div>
</section>
```
