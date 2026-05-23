import { asset } from '../../lib/assets'
import { SectionEyebrow } from './SectionEyebrow'

export function ResumePDF() {
    const pdfUrl = asset('AdrianEddy.pdf')

    return (
        <section
            id="resume"
            className="px-8 py-20 bg-paper-warm border-t border-rule-strong max-md:px-5 max-md:py-12 max-sm:px-4 max-sm:py-10"
        >
            <div className="flex justify-between items-baseline gap-6 mb-7 max-md:flex-col max-md:items-start max-md:gap-4">
                <div>
                    <SectionEyebrow
                        numeral="04"
                        label="The Whole Thing"
                        className="mb-1.5"
                    />
                    <h2 className="font-serif font-normal text-[3.5rem] tracking-[-0.03em] m-0 text-ink leading-[1] max-md:text-[2.5rem] max-sm:text-[2rem]">
                        Résumé, embedded.
                    </h2>
                    <p className="mt-3.5 font-sans text-[0.95rem] leading-[1.55] text-muted measure">
                        One page. The full CV. Open or download from the buttons
                        on the right.
                    </p>
                </div>
                <div className="flex gap-2.5 items-center flex-wrap justify-end max-md:justify-start">
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener"
                        className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink py-2.5 px-4 border border-rule-strong no-underline bg-paper hover:bg-paper-warm transition-colors whitespace-nowrap"
                    >
                        Open in new tab &#x2197;
                    </a>
                    <a
                        href={pdfUrl}
                        download="AdrianEddy_Resume.pdf"
                        className="font-mono text-[11px] tracking-[0.14em] uppercase text-paper py-2.5 px-4 bg-ink no-underline hover:bg-ink-soft transition-colors whitespace-nowrap"
                    >
                        Download .pdf &darr;
                    </a>
                </div>
            </div>

            {/* Filename strip — gives the embed a "real document" frame. */}
            <div className="flex justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-muted py-2.5 px-3.5 bg-paper border border-rule border-b-0 max-w-[920px] mx-auto whitespace-nowrap gap-4">
                <span>
                    <span className="text-accent">&#8251;</span> AdrianEddy.pdf
                </span>
                <span>Updated May 2026 &middot; 1 page</span>
            </div>

            <div
                className="border border-rule bg-white aspect-[8.5/11] max-w-[920px] mx-auto relative"
                style={{
                    boxShadow:
                        '0 1px 0 rgba(0,0,0,0.04), 0 20px 60px -20px rgba(0,0,0,0.25)',
                }}
            >
                <iframe
                    src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
                    title="Adrian Eddy résumé"
                    className="w-full h-full border-none block"
                />
            </div>

            <div className="mt-5 text-center font-sans text-[0.85rem] text-muted">
                Can't see the document?{' '}
                <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener"
                    className="text-accent underline hover:text-accent-deep transition-colors"
                    style={{ textUnderlineOffset: 4 }}
                >
                    Open the PDF directly
                </a>
                .
            </div>
        </section>
    )
}
