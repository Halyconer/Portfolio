import { Masthead } from 'adrianeddy-portfolio'

// Site chrome header. Variant axis: 'full' (home nav + Creative link),
// 'minimal' (back-link used on /creative and /dev-roadtrip), 'bare'
// (rule-only header — renders just the bordered strip, by design).
// Router links work via the PreviewRouter wrapper.

export function Full() {
    return (
        <div className="bg-paper">
            <Masthead variant="full" />
        </div>
    )
}

export function Minimal() {
    return (
        <div className="bg-paper">
            <Masthead variant="minimal" />
        </div>
    )
}

export function Bare() {
    return (
        <div className="bg-paper">
            <Masthead variant="bare" />
        </div>
    )
}
