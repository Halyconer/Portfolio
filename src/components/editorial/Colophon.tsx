export function Colophon() {
    return (
        <footer
            className="px-8 pt-14 pb-16 relative border-t-[3px] border-rule-strong max-md:px-5 max-md:pt-10 max-md:pb-12 max-sm:px-4"
        >
            <div className="flex justify-between items-end gap-6 flex-wrap max-md:items-start max-md:flex-col">
                <div>
                    <div className="font-serif text-[3.5rem] leading-[0.95] tracking-[-0.03em] text-ink max-md:text-[2.5rem] max-sm:text-[2rem]">
                        Get in touch
                        <span className="text-accent">.</span>
                    </div>
                    <a
                        href="mailto:ae2422@nyu.edu"
                        className="font-serif italic text-[1.75rem] text-accent underline inline-block mt-3.5 hover:text-accent-deep transition-colors max-sm:text-[1.3rem]"
                        style={{ textUnderlineOffset: 6 }}
                    >
                        ae2422@nyu.edu
                    </a>
                </div>
                <div
                    className="text-eyebrow text-right leading-[2] max-md:text-left"
                >
                    Set in Fraunces &amp; IBM Plex Mono <br />
                    Built with React + Vite <br />
                    <a
                        href="https://github.com/Halyconer"
                        target="_blank"
                        rel="noopener"
                        className="text-muted hover:text-accent transition-colors no-underline"
                    >
                        GitHub
                    </a>
                    {' · '}
                    &copy; 2026 Adrian Eddy &middot; New York
                </div>
            </div>
        </footer>
    )
}
