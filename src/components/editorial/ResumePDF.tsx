import { asset } from '../../lib/assets'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function ResumePDF() {
    const pdfUrl = asset('AdrianEddy.pdf')

    return (
        <Section id="resume">
            {/* Single centered 920px column shared by heading, document card,
             * and fallback line. The action footer mirrors the demo cards'
             * full-bleed hairline footers. */}
            <div className="max-w-[920px] mx-auto">
                <SectionHeading rule={false} className="mb-4">
                    Résumé
                </SectionHeading>

                <div
                    className="border border-rule bg-paper-warm"
                    style={{
                        boxShadow:
                            '0 1px 0 rgba(0,0,0,0.04), 0 20px 60px -20px rgba(0,0,0,0.25)',
                    }}
                >
                    <div className="flex justify-between text-xs text-muted py-2.5 px-3.5 border-b border-rule whitespace-nowrap gap-4">
                        <span>AdrianEddy.pdf</span>
                        <span>Updated September 2026</span>
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
                            className="card-action"
                        >
                            Open in new tab ↗
                        </a>
                        <a
                            href={pdfUrl}
                            download="AdrianEddy_Resume.pdf"
                            className="card-action border-l border-rule"
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
                        className="link-underline"
                    >
                        Open the PDF directly
                    </a>
                    .
                </div>
            </div>
        </Section>
    )
}
