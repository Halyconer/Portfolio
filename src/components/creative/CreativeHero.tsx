import { Link } from 'react-router-dom'

export function CreativeHero() {
    return (
        <section className="px-8 pt-3.5 pb-6 max-md:px-5 max-sm:px-4">
            {/* Meta line above the headline — back link, volume, byline.
             * The back link replaces the previous "№ 04 · Photographs" tag so
             * the standalone back-link row in the masthead can be dropped. */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-end mb-5 max-md:grid-cols-1 max-md:gap-1.5">
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted">
                    <Link
                        to="/"
                        className="text-ink no-underline border-b border-transparent pb-0.5 hover:border-accent hover:text-accent transition-colors duration-200"
                    >
                        &#x2190; Back to portfolio
                    </Link>
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.32em] uppercase text-ink text-center max-md:text-left">
                    Vol. I &nbsp;·&nbsp; 2024 — 2026
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted text-right max-md:text-left">
                    <b className="text-ink font-medium">Adrian Eddy</b>{' '}
                    &nbsp;·&nbsp; NYC
                </div>
            </div>

            <h1
                className="font-serif font-light text-ink m-0 text-center text-balance leading-[0.92] tracking-[-0.03em] text-[clamp(56px,8vw,120px)]"
                style={{ fontVariationSettings: '"opsz" 144' }}
            >
                Creative
                <span
                    className="text-accent italic font-light"
                    style={{
                        fontVariationSettings: '"opsz" 144, "ital" 1',
                    }}
                >
                    .
                </span>
            </h1>

            <p
                className="mt-6 mx-auto max-w-[680px] text-center font-serif font-light text-[18px] leading-[1.5] text-ink-soft"
                style={{ textWrap: 'pretty' }}
            >
                A working archive of the frames worth keeping —{' '}
                <em className="italic text-accent">graduation,</em> what&rsquo;s
                on the plate, and a city that never quite holds still.
            </p>
        </section>
    )
}
