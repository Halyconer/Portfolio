import { Link } from 'react-router-dom'
import { projects, type Project } from '../../data/projects'
import { SectionEyebrow } from './SectionEyebrow'

interface FigProps {
    project: Project
    featured?: boolean
}

// Typographic project "cover" — giant serif numeral anchors the tile, with
// kind/year in brackets and a one-line italic tagline. No image required.
// Non-featured figures use a FIXED HEIGHT (not aspect ratio) so that two
// figures sharing a row end at the same Y position even when their column
// spans differ — that keeps the text blocks below them aligned. Mobile falls
// back to aspect ratio so the figure scales with phone width.
function Fig({ project: p, featured = false }: FigProps) {
    return (
        <div
            className={`bg-paper-warm border border-rule relative overflow-hidden flex flex-col justify-between ${
                featured
                    ? 'aspect-[16/7] py-7 px-8 max-md:aspect-[16/9] max-md:py-5 max-md:px-5'
                    : 'h-[280px] py-5 px-5 max-md:h-auto max-md:aspect-[16/9]'
            }`}
        >
            {/* subtle midline ruled grid */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                    backgroundImage:
                        'linear-gradient(var(--color-rule), var(--color-rule))',
                    backgroundSize: '100% 1px',
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: '0 50%',
                }}
            />
            <div className="flex justify-between items-baseline relative text-eyebrow-sm">
                <span className="whitespace-nowrap">[&nbsp;{p.kind}&nbsp;]</span>
                <span>{p.year}</span>
            </div>

            <div className="relative text-center font-serif text-ink">
                <div
                    className={`${
                        featured
                            ? 'text-[11rem] max-md:text-[7rem]'
                            : 'text-[7rem] max-md:text-[5rem]'
                    } font-light leading-[0.9] tracking-[-0.04em] text-accent`}
                    style={{ fontVariantNumeric: 'lining-nums' }}
                >
                    {p.n}
                </div>
                <div
                    className={`mt-1.5 italic font-light text-muted max-w-[90%] mx-auto leading-[1.25] ${
                        featured ? 'text-[1.35rem]' : 'text-[1rem]'
                    }`}
                >
                    {p.tagline}
                </div>
            </div>

            <div className="relative flex justify-between items-baseline font-mono text-[10px] tracking-[0.14em] text-muted">
                <span>{p.stack[0]}</span>
                <span className="truncate ml-3">
                    {p.url
                        ? p.url.startsWith('/')
                            ? p.url
                            : p.url
                                  .replace(/^https?:\/\//, '')
                                  .split('/')[0]
                        : '—'}
                </span>
            </div>
        </div>
    )
}

function ProjectMeta({ p }: { p: Project }) {
    return (
        <div className="flex gap-3 items-baseline text-eyebrow mb-3 flex-wrap">
            <span className="text-accent whitespace-nowrap">&#8470;&nbsp;{p.n}</span>
            <span>&middot;</span>
            <span>{p.year}</span>
            <span>&middot;</span>
            <span>{p.kind}</span>
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
            className={`py-6 ${firstRow ? '' : 'border-t border-rule'}`}
            style={{ gridColumn: `span ${span} / span ${span}` }}
        >
            <div
                className={`flex gap-8 items-start max-md:flex-col max-md:gap-5 ${
                    featured ? 'flex-row' : 'flex-col'
                }`}
            >
                <div
                    className={`flex-shrink-0 ${
                        featured ? 'w-[55%] max-md:w-full' : 'w-full'
                    }`}
                >
                    <Fig project={p} featured={featured} />
                </div>

                <div className="flex-1 min-w-0">
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
                    <UrlLink p={p} />
                </div>
            </div>
        </article>
    )
}

export function Projects() {
    // Asymmetric span layout: project 1 is featured (full width, side-by-side
    // figure + text). Subsequent projects pair into 7/5, 6/6, 7/5 rows for
    // tear-sheet rhythm. Figures use a fixed pixel height (not aspect ratio),
    // so paired figures share the same Y baseline and the text blocks below
    // them line up across the row.
    const spans = [12, 7, 5, 6, 6]

    return (
        <section
            id="work"
            className="px-8 py-20 max-md:px-5 max-md:py-12 max-sm:px-4 max-sm:py-10"
        >
            <div className="flex justify-between items-baseline gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
                <div>
                    <SectionEyebrow
                        numeral="02"
                        label="Selected Work"
                        className="mb-2"
                    />
                    <h2 className="font-serif font-normal text-[3.5rem] tracking-[-0.03em] m-0 text-ink leading-[1] max-md:text-[2.5rem] max-sm:text-[2rem]">
                        Five things, built recently.
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
                        firstRow={i <= 2}
                    />
                ))}
            </div>
        </section>
    )
}
