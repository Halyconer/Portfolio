import { useState } from 'react'

import { useApiResource } from '../../hooks/useApiResource'
import type { ReadingStats } from '../../types/reading'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Reading shelf, fed live from Hardcover via the Pi backend (/reading.json).
 * Currently-reading books show a status label; finished ones show stars. A
 * written review, when present, hangs below its row as a smaller muted note,
 * clamped to REVIEW_LIMIT characters with a "Read more" toggle.
 * Renders nothing if the Pi is unreachable or the shelf is empty.
 */

/** Character budget before a review is truncated behind "Read more". */
const REVIEW_LIMIT = 160

function truncateReview(text: string): string {
    const cut = text.slice(0, REVIEW_LIMIT)
    const lastSpace = cut.lastIndexOf(' ')
    return `${cut.slice(0, lastSpace > 0 ? lastSpace : REVIEW_LIMIT).trimEnd()}…`
}

function Review({ text }: { text: string }) {
    const [expanded, setExpanded] = useState(false)
    const isLong = text.length > REVIEW_LIMIT

    return (
        <p className="m-0 mt-1.5 font-serif text-[0.8rem] leading-[1.6] text-muted whitespace-pre-line">
            {isLong && !expanded ? truncateReview(text) : text}
            {isLong && (
                <>
                    {' '}
                    <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        className="btn-reset text-label align-baseline hover:text-ink transition-colors"
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                </>
            )}
        </p>
    )
}

function Stars({ rating }: { rating: number }) {
    // Half-star steps from Hardcover — round to whole stars for display.
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
        <Section id="reading">
            <SectionHeading>To keep me accountable:</SectionHeading>

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
                            className="py-3 border-b border-rule"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="font-serif text-ink">
                                    {b.title}{' '}
                                    <span className="text-muted">
                                        — {b.author}
                                    </span>
                                </span>
                                {right && (
                                    <>
                                        {/* Dotted rule on the text baseline —
                                         * classic TOC leader. */}
                                        <span
                                            aria-hidden
                                            className="flex-1 border-b border-dotted border-rule-strong"
                                        />
                                        {right}
                                    </>
                                )}
                            </div>
                            {b.review && <Review text={b.review} />}
                        </div>
                    )
                })}
            </div>

            {data?.username && (
                <a
                    href={`https://hardcover.app/@${data.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-rule text-label mt-5"
                >
                    See the rest →
                </a>
            )}
        </Section>
    )
}
