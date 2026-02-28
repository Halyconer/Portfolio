import { projects } from '../../data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
    return (
        <section id="projects" className="bg-white py-3 px-4 mb-1">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-center text-slate-dark text-[1.8rem] font-bold mb-1">
                    Other Projects
                </h2>
                <div className="grid grid-cols-2 gap-2 mt-1 max-md:grid-cols-1">
                    {projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </section>
    )
}
