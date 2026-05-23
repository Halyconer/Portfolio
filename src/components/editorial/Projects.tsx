import { Link } from 'react-router-dom'
import { projects, type Project } from '../../data/projects'
import { SectionEyebrow } from './SectionEyebrow'

function ProjectMeta({ p }: { p: Project }) {
    return (
        <div className="flex gap-3 items-baseline text-eyebrow mb-3 flex-wrap">
            <span className="text-accent whitespace-nowrap">
                &#8470;&nbsp;{p.n}
            </span>
            <span>&middot;</span>
            <span>{p.year}</span>
            <span>&middot;</span>
            <span>{p.kind}</span>
        </div>
    )
}

function StackChips({ p }: { p: Project }) {
    return (
        <div className="flex gap-2 mt-4 flex-wrap items-center">
            {p.stack.map((s) => (
                <span
                    key={s}
                    className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink border border-rule py-1 px-2"
                >
                    {s}
                </span>
            ))}
        </div>
    )
}

function UrlLink({ p }: { p: Project }) {
    if (!p.url) return null
    const isInternal = p.url.startsWith('/')
    const display = isInternal
        ? p.url
        : p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    const cls =
        'mt-3 inline-flex items-baseline gap-1.5 font-mono text-[11px] text-accent underline underline-offset-4 decoration-1 hover:text-accent-deep transition-colors break-all'

    if (isInternal) {
        return (
            <Link to={p.url} className={cls}>
                <span>{display}</span>
                <span aria-hidden className="opacity-70">↗</span>
            </Link>
        )
    }
    return (
        <a href={p.url} target="_blank" rel="noopener" className={cls}>
            <span>{display}</span>
            <span aria-hidden className="opacity-70">↗</span>
        </a>
    )
}

interface ArticleProps {
    p: Project
    span: number
    featured?: boolean
    firstRow?: boolean
}

function ProjectArticle({ p, span, featured = false, firstRow }: ArticleProps) {
    return (
        <article
            className={`py-6 min-w-0 ${firstRow ? '' : 'border-t border-rule'}`}
            style={{ gridColumn: `span ${span} / span ${span}` }}
        >
            <ProjectMeta p={p} />
            <h3
                className={`font-serif font-normal m-0 leading-[1.05] tracking-[-0.025em] text-ink ${
                    featured
                        ? 'text-[3.2rem] max-md:text-[2.2rem] max-sm:text-[1.8rem]'
                        : 'text-[1.875rem] max-sm:text-[1.5rem]'
                }`}
            >
                {p.title}
            </h3>
            <p
                className={`mt-3.5 font-sans text-muted leading-[1.55] measure ${
                    featured ? 'text-[1.05rem]' : 'text-[0.95rem]'
                }`}
            >
                {p.blurb}
            </p>
            <StackChips p={p} />
            <UrlLink p={p} />
        </article>
    )
}

export function Projects() {
    // Asymmetric column spans give the grid a tear-sheet rhythm without
    // needing imagery: project 1 spans the full row, then pairs of 7/5,
    // 6/6, 7/5 alternate widths so the eye doesn't lock onto a uniform grid.
    const spans = [12, 7, 5, 6, 6, 7, 5]

    // firstRow flag suppresses the top border. The 12-col featured row is one
    // article (index 0); the next visual row contains indices 1 and 2.
    const firstRowIndices = new Set([0, 1, 2])

    return (
        <section
            id="work"
            className="px-8 py-20 max-md:px-5 max-md:py-12 max-sm:px-4 max-sm:py-10"
        >
            <div className="flex justify-between items-baseline gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
                <div>
                    <SectionEyebrow
                        numeral="03"
                        label="Selected Work"
                        className="mb-2"
                    />
                    <h2 className="font-serif font-normal text-[3.5rem] tracking-[-0.03em] m-0 text-ink leading-[1] max-md:text-[2.5rem] max-sm:text-[2rem]">
                        Seven things, built recently.
                    </h2>
                </div>
                <div className="text-eyebrow text-right max-sm:text-left">
                    {projects.length.toString().padStart(2, '0')} entries / 2024&ndash;2026
                </div>
            </div>

            <div className="h-px bg-rule-strong mt-7 mb-2" />

            <div className="grid grid-cols-12 gap-x-8 items-start max-md:grid-cols-1 max-md:gap-y-2">
                {projects.map((p, i) => (
                    <ProjectArticle
                        key={p.n}
                        p={p}
                        span={spans[i] ?? 6}
                        featured={i === 0}
                        firstRow={firstRowIndices.has(i)}
                    />
                ))}
            </div>
        </section>
    )
}
