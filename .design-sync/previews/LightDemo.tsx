import { LightDemo } from 'adrianeddy-portfolio'

// Smart-light demo card. Mirrors Demos.tsx real usage:
// <LightDemo apiStatus={{ tone, label: STATUS_LABEL[tone] }} />
// The set-brightness/set-color POSTs hit the Pi, unreachable in preview —
// the card's own idle/fallback state is the expected render.
// Constrained to its real grid-column width (~560px) so the card reads as
// it does inside the Demos 1.1fr/1fr grid.

export function HardwareOnline() {
    return (
        <div className="bg-paper" style={{ maxWidth: 560, padding: 16 }}>
            <LightDemo apiStatus={{ tone: 'online', label: 'Hardware online' }} />
        </div>
    )
}

export function HardwareOffline() {
    return (
        <div className="bg-paper" style={{ maxWidth: 560, padding: 16 }}>
            <LightDemo apiStatus={{ tone: 'offline', label: 'Hardware offline' }} />
        </div>
    )
}
