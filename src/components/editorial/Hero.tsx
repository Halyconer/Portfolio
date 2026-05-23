import { scrollTo } from '../../lib/scroll'

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

            <div className="mt-14 measure max-md:mt-10 max-sm:mt-6">
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
                    <button
                        type="button"
                        onClick={() => scrollTo('resume')}
                        className="btn-reset bg-ink text-paper py-3.5 px-5 font-mono text-[12px] tracking-[0.14em] uppercase inline-flex items-center gap-3 hover:bg-ink-soft transition-colors duration-200"
                    >
                        Read Résumé <span className="opacity-50">↓</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollTo('demos')}
                        className="btn-reset text-ink py-3.5 px-5 font-mono text-[12px] tracking-[0.14em] uppercase border border-rule-strong inline-flex items-center gap-3 hover:bg-ink hover:text-paper transition-colors duration-200"
                    >
                        Live Demos <span className="opacity-50">↓</span>
                    </button>
                    <a
                        href="mailto:ae2422@nyu.edu"
                        className="text-muted py-3.5 px-1 font-mono text-[12px] tracking-[0.14em] uppercase underline self-center hover:text-accent transition-colors duration-200"
                        style={{ textUnderlineOffset: 5 }}
                    >
                        ae2422@nyu.edu
                    </a>
                </div>
            </div>
        </section>
    )
}
