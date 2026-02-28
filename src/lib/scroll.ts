export function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
        window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' })
    }
}
