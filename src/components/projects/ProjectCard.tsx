import type { Project } from '../../data/projects'
import { asset } from '../../lib/assets'

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const Wrapper = project.url ? 'a' : 'div'
    const linkProps = project.url
        ? {
              href: project.url,
              target: '_blank' as const,
              rel: 'noopener',
          }
        : {}

    return (
        <Wrapper
            {...linkProps}
            className="project-card-touch flex gap-4 p-4 bg-white border border-border rounded-md no-underline text-inherit transition-all duration-300 cursor-pointer min-h-[120px] items-center shadow-[0_3px_12px_rgba(0,0,0,0.1)] hover:border-primary hover:shadow-[0_8px_30px_rgba(74,144,226,0.25)] hover:-translate-y-[3px] hover:scale-[1.01] hover:no-underline active:translate-y-[-1px] active:scale-[1.005] active:shadow-[0_4px_20px_rgba(74,144,226,0.2)] max-md:min-h-[120px] max-md:gap-4 max-md:p-5 max-xs:p-4 max-xs:min-h-[100px] max-xs:gap-3 group"
        >
            {project.image && (
                <div className="w-[120px] h-[120px] shrink-0 rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105 max-md:w-[100px] max-md:h-[100px] max-xs:w-[80px] max-xs:h-[80px]">
                    <img
                        src={asset(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300"
                    />
                </div>
            )}
            <div className="flex-1">
                <h3 className="m-0 mb-1 text-ink text-[1.1rem] font-semibold transition-colors duration-300 group-hover:text-primary max-xs:text-base">
                    {project.title}
                </h3>
                <p className="text-muted text-[0.9rem] m-0 mb-2 text-justify leading-snug max-sm:text-left max-xs:hidden">
                    {project.description}
                </p>
            </div>
        </Wrapper>
    )
}
