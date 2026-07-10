import { Colophon } from 'adrianeddy-portfolio'

// Site footer: top rule + right-aligned GitHub / copyright line.
// Takes no props — one canonical render.
export function Default() {
    return (
        <div className="bg-paper">
            <Colophon />
        </div>
    )
}
