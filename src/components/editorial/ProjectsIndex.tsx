import { Link } from 'react-router-dom'
import { projects, type Project } from '../../data/projects'

function UrlLink({ p }: { p: Project }) {
    if (!p.url) return null
    const isInternal = p.url.startsWith('/')
    const display = isInternal
        ? p.url
        : p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    const cls =
        'mt-3 inline-flex items-baseline gap-1.5 font-mono text-xs text-ink underline underline-offset-4 decoration-1 decoration-rule-strong hover:text-muted transition-colors break-all'

    if (isInternal) {
        return (
            <Link to={p.url} className={cls}>
                <span>{display}</span>
                <span aria-hidden className="opacity-70">
                    ↗
                </span>
            </Link>
        )
    }
    return (
        <a href={p.url} target="_blank" rel="noopener" className={cls}>
            <span>{display}</span>
            <span aria-hidden className="opacity-70">
                ↗
            </span>
        </a>
    )
}

export function Projects() {
    return (
        <section
            id="work"
            className="px-8 py-10 max-md:px-5 max-md:py-8 max-sm:px-4 max-sm:py-6"
        >
            <div className="flex justify-between items-baseline gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                <h2 className="font-serif font-normal text-title m-0 text-ink">
                    A few things I've worked on
                </h2>
            </div>

            <div className="h-px bg-rule-strong mt-4" />

            {projects.map((p) => (
                <article
                    key={p.n}
                    className="py-5 border-b border-rule last:border-b-0 grid grid-cols-[3rem_1fr] max-sm:grid-cols-[2.25rem_1fr] items-baseline"
                >
                    <span className="font-mono text-xs text-muted">{p.n}</span>

                    <div className="min-w-0">
                        <div className="flex justify-between items-baseline gap-4">
                            <h3 className="font-serif font-normal text-heading m-0 text-ink">
                                {p.title}
                            </h3>
                            <span className="font-mono text-xs text-muted shrink-0">
                                {p.year}
                            </span>
                        </div>

                        <div className="mt-1.5 font-mono text-xs text-muted tracking-wide uppercase">
                            {p.kind}&ensp;·&ensp;{p.stack.join(' · ')}
                        </div>

                        <p className="mt-2 text-sm text-muted leading-[1.6] max-w-[72ch]">
                            <em className="not-italic text-ink-soft">
                                {p.tagline}
                            </em>{' '}
                            — {p.blurb}
                        </p>

                        <UrlLink p={p} />
                    </div>
                </article>
            ))}
        </section>
    )
}
