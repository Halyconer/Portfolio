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

/**
 * `scrollTo`, resilient to late layout. Sections that fetch after mount (the
 * reading shelf) can grow and push the target down mid-scroll, so re-align
 * once the document has stopped resizing. Used when arriving from another
 * route, where the target is scrolled before the home page has settled.
 */
export function scrollToWhenSettled(id: string) {
    if (id === 'top') {
        scrollTo(id)
        return
    }
    const el = document.getElementById(id)
    if (!el) return

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })

    // Restart the quiet timer on every resize; when the page stops growing
    // for 250ms, the target has its final position — align and stop.
    let quiet: number | undefined
    const observer = new ResizeObserver(() => {
        window.clearTimeout(quiet)
        quiet = window.setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            observer.disconnect()
        }, 250)
    })
    observer.observe(document.body)
    // Hard stop in case the page never settles.
    window.setTimeout(() => observer.disconnect(), 4000)
}
