import { scrollTo } from '../../lib/scroll'

export function Hero() {
    return (
        <section
            id="top"
            className="px-8 pt-12 pb-16 relative max-md:px-5 max-md:pt-8 max-md:pb-10 max-sm:px-4 max-sm:pt-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 lg:gap-20 items-stretch">
                {/* Left Column: Text & CTA */}
                <div className="flex flex-col justify-between pt-2 pb-10 max-md:pb-0">
                    <div>
                        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted mb-5">
                            § Portfolio — Economics × Software
                        </p>
                        
                        <h1
                            className="optical-trim font-serif font-normal text-ink m-0 leading-[0.86] tracking-[-0.045em] text-[10rem] max-lg:text-[8rem] max-md:text-[6rem] max-sm:text-[4rem] max-xs:text-[3.2rem]"
                            style={{ fontVariationSettings: '"opsz" 144' }}
                        >
                            Adrian
                            <br />
                            Eddy<span className="text-accent">.</span>
                        </h1>

                        <p className="drop-cap mt-9 measure font-serif font-light text-ink text-[1.65rem] leading-[1.4] m-0 max-md:text-[1.35rem] max-sm:text-[1.15rem]">
                            I care about the boring infrastructure of markets — how
                            prices form, how strategies decay, how to size a position
                            so you don't blow up. The best questions in economics are
                            empirical; the best empirical work needs code that runs.
                        </p>
                    </div>

                    <div className="flex gap-3.5 mt-8 flex-wrap items-center max-sm:mt-6">
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

                {/* Right Column: Portrait Card Panel */}
                <div className="bg-paper-warm border border-rule relative flex flex-col items-center justify-center p-8 aspect-[2/3] max-w-[360px] w-full mx-auto md:ml-auto md:mr-0">
                    <img
                        src="/assets/headshot.jpg"
                        alt="Adrian Eddy"
                        loading="eager"
                        fetchPriority="high"
                        className="w-full max-w-[296px] aspect-[4/5] object-cover border border-rule-strong"
                    />
                    <div className="flex justify-between w-full max-w-[296px] mt-8 font-mono text-[10px] text-muted tracking-[0.18em] uppercase">
                        <span>Econ '26 · NYU</span>
                        <span>NYC · 2026</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

