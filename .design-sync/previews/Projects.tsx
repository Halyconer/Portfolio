import { Projects } from 'adrianeddy-portfolio'

// Figure-based work grid: featured 12-col row, then 7/5 and 6/6 asymmetric
// pairs of typographic "covers" (giant serif numeral + italic tagline).
// No props — content comes from src/data/projects.
export function Default() {
    return (
        <div className="bg-paper">
            <Projects />
        </div>
    )
}
