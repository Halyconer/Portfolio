import { asset } from '../../lib/assets'

export function ResumePDF() {
    const pdfUrl = asset('AdrianEddy.pdf')

    return (
        <section
            id="resume"
            className="px-8 py-10 border-t border-rule-strong max-md:px-5 max-md:py-8 max-sm:px-4 max-sm:py-6"
        >
            {/* Single centered 920px column: heading, document card, and the
             * fallback line all share it so the section reads as one block. */}
            <div className="max-w-[920px] mx-auto">
                <div className="mb-4">
                    <h2 className="font-serif font-normal text-title m-0 text-ink">
                        Résumé
                    </h2>
                </div>

                {/* Everything the document owns — filename bar, sheet, actions —
                 * lives inside one bordered card so it all shares the same 920px
                 * column. The action footer mirrors the demo cards' full-bleed
                 * hairline footers. */}
                <div
                    className="border border-rule bg-paper-warm"
                    style={{
                        boxShadow:
                            '0 1px 0 rgba(0,0,0,0.04), 0 20px 60px -20px rgba(0,0,0,0.25)',
                    }}
                >
                    <div className="flex justify-between text-xs text-muted py-2.5 px-3.5 border-b border-rule whitespace-nowrap gap-4">
                        <span>AdrianEddy.pdf</span>
                        <span>Updated May 2026</span>
                    </div>

                    <div className="aspect-[8.5/11] bg-white relative">
                        <iframe
                            src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                            title="Adrian Eddy résumé"
                            className="w-full h-full border-none block"
                        />
                    </div>

                    <div className="flex border-t border-rule">
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener"
                            className="flex-1 text-center text-sm text-ink py-3.5 px-5 no-underline hover:bg-ink hover:text-paper transition-colors whitespace-nowrap"
                        >
                            Open in new tab ↗
                        </a>
                        <a
                            href={pdfUrl}
                            download="AdrianEddy_Resume.pdf"
                            className="flex-1 text-center text-sm text-ink py-3.5 px-5 border-l border-rule no-underline hover:bg-ink hover:text-paper transition-colors whitespace-nowrap"
                        >
                            Download .pdf ↓
                        </a>
                    </div>
                </div>

                <div className="mt-5 text-sm text-muted">
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
            </div>
        </section>
    )
}
