import { Connect4Inline } from 'adrianeddy-portfolio'

// Connect 4 demo card (idle state: "● AI READY", empty 7×6 dot-grid teaser,
// "Play game →" hairline footer). No props. Starting a game calls the Pi
// backend, unreachable in preview — the idle card is the expected render.
// Width-constrained to match its real Demos grid column.
export function Default() {
    return (
        <div className="bg-paper" style={{ maxWidth: 520, padding: 16 }}>
            <Connect4Inline />
        </div>
    )
}
