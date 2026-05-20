import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { asset } from '../../lib/assets'

interface ProjectCardProps {
    project: Project
    index?: number
}

const cardClass =
    'project-card-touch flex flex-col gap-3 p-7 bg-bg-page no-underline text-inherit transition-colors duration-200 cursor-pointer hover:bg-bg-light max-md:p-5 max-xs:p-4'

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const num = (index + 1).toString().padStart(2, '0')
    const isInternal = project.url?.startsWith('/')

    const inner = (
        <>
            <p className="text-[0.68rem] text-muted/40 font-inter tracking-[0.1em] m-0">
                {num}
            </p>
            <div className="flex gap-4 items-start">
                {project.image && (
                    <div className="w-[72px] h-[72px] shrink-0 overflow-hidden max-xs:w-[56px] max-xs:h-[56px]">
                        <img
                            src={asset(project.image)}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="m-0 mb-1.5 text-heading text-[1rem] font-normal font-poly max-xs:text-base">
                        {project.title}
                    </h3>
                    <p className="text-muted text-[0.85rem] m-0 leading-relaxed max-xs:hidden">
                        {project.description}
                    </p>
                </div>
            </div>
        </>
    )

    if (isInternal) {
        return <Link to={project.url!} className={cardClass}>{inner}</Link>
    }

    if (project.url) {
        return (
            <a href={project.url} target="_blank" rel="noopener" className={cardClass}>
                {inner}
            </a>
        )
    }

    return <div className={cardClass}>{inner}</div>
}

