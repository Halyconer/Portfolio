import { ProjectsIndex } from 'adrianeddy-portfolio'

// Index-style work list (the variant HomePage actually renders): numbered
// rows with mono numeral gutter, title/year baseline, uppercase mono
// kind·stack line, tagline — blurb. No props — content from src/data/projects.
export function Default() {
    return (
        <div className="bg-paper">
            <ProjectsIndex />
        </div>
    )
}
