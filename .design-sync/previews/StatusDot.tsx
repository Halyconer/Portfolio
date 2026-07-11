import { StatusDot } from 'adrianeddy-portfolio'

// Mirrors LightDemo's real usage: <StatusDot tone={apiStatus.tone}>{label}</StatusDot>
export function Online() {
    return (
        <span className="text-sm text-ink">
            <StatusDot tone="online">Hardware online</StatusDot>
        </span>
    )
}

export function Offline() {
    return (
        <span className="text-sm text-ink">
            <StatusDot tone="offline">Hardware offline</StatusDot>
        </span>
    )
}

export function Probing() {
    return (
        <span className="text-sm text-ink">
            <StatusDot tone="probing">Checking the Pi…</StatusDot>
        </span>
    )
}
