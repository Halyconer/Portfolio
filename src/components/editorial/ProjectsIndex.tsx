import { Link } from 'react-router-dom'

import { projects, type Project } from '../../data/projects'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

function UrlLink({ p }: { p: Project }) {
    if (!p.url) return null
    const isInternal = p.url.startsWith('/')
    const display = isInternal
        ? p.url
        : p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    const cls =
        'link-underline mt-3 inline-flex items-baseline gap-1.5 font-mono text-xs break-all'
    const inner = (
        <>
            <span>{display}</span>
            <span aria-hidden className="opacity-70">
                ↗
            </span>
        </>
    )
    return isInternal ? (
        <Link to={p.url} className={cls}>
            {inner}
        </Link>
    ) : (
        <a href={p.url} target="_blank" rel="noopener" className={cls}>
            {inner}
        </a>
    )
}

export function Projects() {
    return (
        <Section id="work">
            <SectionHeading>What I like to do in my free time</SectionHeading>

            {projects.map((p) => (
                <article
                    key={p.n}
                    className="py-5 border-b border-rule last:border-b-0 grid grid-cols-[3rem_1fr] max-sm:grid-cols-[2.25rem_1fr] items-baseline"
                >
                    <span className="font-mono text-xs text-muted">{p.n}</span>

                    <div className="min-w-0">
                        <div className="flex justify-between items-baseline gap-4">
                            <h3 className="font-serif font-normal text-base m-0 text-ink">
                                {p.title}
                            </h3>
                            <span className="text-label shrink-0">
                                {p.year}
                            </span>
                        </div>

                        <div className="mt-1.5 text-label">
                            {p.kind}&ensp;·&ensp;{p.stack.join(' · ')}
                        </div>

                        <p className="mt-2 text-base text-muted leading-[1.6]">
                            <em className="not-italic text-ink-soft">
                                {p.tagline}
                            </em>{' '}
                            — {p.blurb}
                        </p>

                        <UrlLink p={p} />
                    </div>
                </article>
            ))}
        </Section>
    )
}
