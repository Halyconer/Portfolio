import { useApiResource } from '../../hooks/useApiResource'
import type { ReadingStats } from '../../types/reading'

/**
 * Reading shelf, fed live from Hardcover via the Pi backend (/reading.json —
 * see backend/generate_reading_stats.py). Currently-reading books show a
 * status label; recently-finished ones show their star rating. If the Pi is
 * unreachable or the shelf is empty, the section renders nothing at all —
 * same spirit as the other Pi-backed sections.
 */

function Stars({ rating }: { rating: number }) {
    // Hardcover ratings come in half-star steps; round to whole stars for
    // display — ★★★★☆ reads cleaner in Times than a half-star glyph.
    const filled = Math.min(5, Math.max(0, Math.round(rating)))
    return (
        <span
            className="text-ink-soft whitespace-nowrap"
            aria-label={`Rated ${rating} out of 5`}
        >
            {'★'.repeat(filled)}
            {'☆'.repeat(5 - filled)}
        </span>
    )
}

export function Reading() {
    const { data } = useApiResource<ReadingStats>('/reading.json')

    const reading = data?.currently_reading ?? []
    const finished = data?.recent_reads ?? []
    if (reading.length + finished.length === 0) return null

    const rows = [
        ...reading.map((b) => ({
            ...b,
            rating: null as number | null,
            current: true,
        })),
        ...finished.map((b) => ({ ...b, current: false })),
    ]

    return (
        <section
            id="reading"
            className="px-8 py-10 max-md:px-5 max-md:py-8 max-sm:px-4 max-sm:py-6"
        >
            <h2 className="font-serif font-light text-heading m-0 text-ink">
                To keep me accountable:
            </h2>

            <div className="h-px bg-rule-strong mt-4" />

            <div>
                {rows.map((b, i) => {
                    const right = b.current ? (
                        <span className="text-label text-muted-hi whitespace-nowrap">
                            Currently reading
                        </span>
                    ) : b.rating != null ? (
                        <Stars rating={b.rating} />
                    ) : null

                    return (
                        <div
                            key={`${b.title}-${i}`}
                            className="flex items-baseline gap-3 py-3 border-b border-rule"
                        >
                            <span className="font-serif text-ink">
                                {b.title}{' '}
                                <span className="text-muted">— {b.author}</span>
                            </span>
                            {right && (
                                <>
                                    {/* Empty flex item: its synthesized
                                     * baseline is its bottom edge, so the
                                     * dotted rule sits on the text baseline —
                                     * classic TOC leader. */}
                                    <span
                                        aria-hidden
                                        className="flex-1 border-b border-dotted border-rule-strong"
                                    />
                                    {right}
                                </>
                            )}
                        </div>
                    )
                })}
            </div>

            {data?.username && (
                <a
                    href={`https://hardcover.app/@${data.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label inline-block no-underline border-b border-rule-strong pb-0.5 mt-5 hover:text-ink transition-colors"
                >
                    See the rest →
                </a>
            )}
        </section>
    )
}
