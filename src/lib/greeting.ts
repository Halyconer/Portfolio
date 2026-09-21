/**
 * Visitor-local greeting for the hero headline, based on the clock at page
 * load. Buckets are deliberately coarse; the greeting doesn't update while
 * the tab stays open.
 */
export function getGreeting(date = new Date()): string {
    const hour = date.getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
}
