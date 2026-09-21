export function CreativeHero() {
    return (
        <section className="px-8 pt-3.5 pb-6 max-md:px-5 max-sm:px-4">
            {/* Meta line above the headline — gear credit, volume, byline. */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-end mb-5 max-md:grid-cols-1 max-md:gap-1.5">
                <div className="text-label">
                    Frames shot on Nikon and Sony cameras
                </div>
                <div className="text-label text-ink text-center tracking-[0.32em] max-md:text-left">
                    Vol. I &nbsp;·&nbsp; 2024 — 2026
                </div>
                <div className="text-label text-right max-md:text-left">
                    <b className="text-ink font-medium">Adrian Eddy</b>
                </div>
            </div>

            <h1 className="font-serif font-light text-ink m-0 text-center text-balance text-cover">
                Creative
                <span className="text-accent italic font-light">.</span>
            </h1>

            <p
                className="mt-6 mx-auto max-w-[680px] text-center font-serif font-light text-[18px] leading-[1.5] text-ink-soft"
                style={{ textWrap: 'pretty' }}
            >
                I suck at drawing, so photography has become my creative escape.
                I've been helping some friends take their graduation photos, so
                I've had some practice. Feel free to HMU.
            </p>
        </section>
    )
}
