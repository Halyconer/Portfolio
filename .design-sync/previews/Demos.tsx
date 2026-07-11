import { Demos } from 'adrianeddy-portfolio'

// § Demos section: LightDemo + Connect4Inline in an asymmetric 1.1fr/1fr grid.
// No props. It probes the Pi via /stats.json, which is unreachable in preview,
// so the status dot settles on "Hardware offline" — that is the correct,
// expected fallback render.
export function Default() {
    return (
        <div className="bg-paper">
            <Demos />
        </div>
    )
}
