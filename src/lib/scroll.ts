/**
 * Smooth-scroll to an element by id. Uses `scrollIntoView` (works regardless
 * of positioned ancestors) plus CSS `scroll-margin-top` on sections to handle
 * the visual offset — see `index.css` `[id]` rule.
 */
export function scrollTo(id: string) {
    if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
