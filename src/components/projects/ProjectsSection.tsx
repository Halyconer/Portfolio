import { projects } from '../../data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
    return (
        // Editorial pass: section background dropped from white to inherit
        // (so the warm page cream shows through, unifying the look). Heading
        // now uses Poly at a quieter weight (font-normal, not font-bold).
        <section id="projects" className="py-8 px-4 mb-1 border-t border-border">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex justify-between items-baseline mb-6">
                    <p className="text-[0.7rem] tracking-[0.22em] uppercase text-muted font-inter">
                        Selected work
                    </p>
                    <p className="text-[0.7rem] text-muted/50 font-inter">
                        {projects.length.toString().padStart(2, '0')} projects
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-[1px] max-md:grid-cols-1" style={{ backgroundColor: '#2a2510' }}>
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
