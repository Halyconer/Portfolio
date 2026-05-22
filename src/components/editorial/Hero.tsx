import { scrollTo } from '../../lib/scroll'

const stats: Array<{ k: string; v: string }> = [
    { k: 'GPA', v: '3.84' },
    { k: 'Major', v: 'Economics' },
    { k: 'Minor', v: 'CS' },
    { k: 'Class of', v: '2026' },
]

export function Hero() {
    return (
        <section
            id="top"
            className="px-8 pt-12 pb-16 relative max-md:px-5 max-md:pt-8 max-md:pb-10 max-sm:px-4 max-sm:pt-6"
        >
            {/* The big serif name — display-size Fraunces, hugely tight tracking,
             * terracotta accent on the period. Sets the editorial tone. */}
            <h1
                className="font-serif font-normal text-ink m-0 leading-[0.86] tracking-[-0.045em] text-[10rem] max-lg:text-[8rem] max-md:text-[6rem] max-sm:text-[4rem] max-xs:text-[3.2rem]"
                style={{ fontVariationSettings: '"opsz" 144' }}
            >
                Adrian
                <br />
                Eddy<span className="text-accent">.</span>
            </h1>

            {/* Two-column body: intro paragraph + CTAs on the left, At-a-Glance
             * stats grid on the right. Collapses to a single column on tablet. */}
            <div className="mt-14 grid grid-cols-[1.1fr_1fr] gap-20 items-stretch max-lg:gap-12 max-md:grid-cols-1 max-md:gap-10 max-md:mt-10 max-sm:mt-6">
                <div className="flex flex-col justify-between">
                    <p className="font-serif font-light text-ink text-[1.85rem] leading-[1.28] tracking-[-0.01em] m-0 max-md:text-[1.5rem] max-sm:text-[1.2rem]">
                        Economics undergraduate at NYU, focused on{' '}
                        <em className="italic text-accent">econometrics</em> and{' '}
                        <em className="italic text-accent">financial markets</em>.
                        I build software that sits at the seam between the two —
                        trading systems, pricing engines, a behavioral-finance
                        thesis on calendar effects, and the occasional Connect 4
                        AI.
                    </p>

                    <div className="flex gap-3.5 mt-10 flex-wrap items-center max-sm:mt-6">
                        <a
                            href="#resume"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollTo('resume')
                            }}
                            className="bg-ink text-paper py-3.5 px-5 font-mono text-[12px] tracking-[0.14em] uppercase no-underline inline-flex items-center gap-3 hover:bg-ink-soft transition-colors duration-200 cursor-pointer"
                        >
                            Read Résumé <span className="opacity-50">&#x2193;</span>
                        </a>
                        <a
                            href="#demos"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollTo('demos')
                            }}
                            className="bg-transparent text-ink py-3.5 px-5 font-mono text-[12px] tracking-[0.14em] uppercase no-underline border border-rule-strong inline-flex items-center gap-3 hover:bg-ink hover:text-paper transition-colors duration-200 cursor-pointer"
                        >
                            Live Demos <span className="opacity-50">&#x2193;</span>
                        </a>
                        <a
                            href="mailto:ae2422@nyu.edu"
                            className="text-muted py-3.5 px-1 font-mono text-[12px] tracking-[0.14em] uppercase underline self-center hover:text-accent transition-colors duration-200"
                            style={{ textUnderlineOffset: 5 }}
                        >
                            ae2422@nyu.edu
                        </a>
                    </div>
                </div>

                {/* At a Glance — stats grid. Vertical rules + tabular numerals
                 * give it the look of a published data table. */}
                <div className="flex flex-col">
                    <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
                        <span className="text-accent">&#8251;</span> At a glance
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 flex-1">
                        {stats.map((s, i) => (
                            <div
                                key={s.k}
                                className={`py-5 border-b border-rule ${
                                    i < 2 ? 'border-t border-t-rule' : ''
                                }`}
                            >
                                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
                                    {s.k}
                                </div>
                                <div
                                    className="font-serif text-[2.5rem] font-normal text-ink tracking-[-0.02em] max-sm:text-[2rem]"
                                    style={{
                                        fontVariantNumeric: 'tabular-nums',
                                    }}
                                >
                                    {s.v}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-3.5 border-t border-rule-strong flex justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-muted whitespace-nowrap gap-4">
                        <span>New York</span>
                        <span>Last updated &middot; May 2026</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
