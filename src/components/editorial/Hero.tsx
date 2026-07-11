import { scrollTo } from '../../lib/scroll'

export function Hero() {
    return (
        <section
            id="top"
            className="px-8 pt-6 pb-8 relative max-md:px-5 max-md:pt-5 max-md:pb-6 max-sm:px-4 max-sm:pt-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 lg:gap-10 items-stretch">
                {/* Left Column: Text & CTA */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="font-serif font-normal text-ink m-0 text-display">
                            Adrian Eddy<span className="text-accent">.</span>
                        </h1>

                        <p className="mt-5 measure font-serif font-light text-ink text-lg leading-relaxed m-0">
                            Hi and thank you for visiting my nook on the web.
                            From a very young age my favourite thing to do in
                            the world was tinker, and my parents getting me a
                            Raspberry Pi was one of the greatest things to
                            happen to me in that respect, leading me to this
                            website and my job. This website tells my story
                            exploring the world of computers, networking, and
                            hardware.
                        </p>
                    </div>

                    <div className="flex gap-3 mt-5 flex-wrap items-center max-sm:mt-4">
                        <button
                            type="button"
                            onClick={() => scrollTo('resume')}
                            className="btn-reset bg-ink text-paper py-3 px-5 text-sm inline-flex items-center gap-2 hover:bg-ink-soft transition-colors duration-200"
                        >
                            Read Résumé ↓
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollTo('demos')}
                            className="btn-reset text-ink py-3 px-5 text-sm border border-rule-strong inline-flex items-center gap-2 hover:bg-ink hover:text-paper transition-colors duration-200"
                        >
                            Live Demos ↓
                        </button>
                        <a
                            href="mailto:business@adrianeddy.com"
                            className="text-muted text-sm underline self-center hover:text-accent transition-colors duration-200"
                            style={{ textUnderlineOffset: 4 }}
                        >
                            business@adrianeddy.com
                        </a>
                    </div>
                </div>

                {/* Right Column: portrait. On md+ the image is absolutely
                 * positioned inside the frame so it can't add height of its
                 * own — the text column alone sets the row height, and the
                 * frame stretches to match, keeping top and bottom edges of
                 * both columns flush. */}
                <div className="relative bg-paper-warm border border-rule p-3 max-w-[300px] w-full mx-auto md:mr-0">
                    <img
                        src="/assets/headshot.jpg"
                        alt="Adrian Eddy"
                        loading="eager"
                        fetchPriority="high"
                        className="w-full aspect-[4/5] object-cover border border-rule-strong md:absolute md:inset-3 md:w-[calc(100%-1.5rem)] md:h-[calc(100%-1.5rem)] md:aspect-auto"
                    />
                </div>
            </div>
        </section>
    )
}
