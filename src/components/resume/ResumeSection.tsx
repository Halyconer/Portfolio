import { asset } from '../../lib/assets'
import { Button, LinkButton } from '../ui/Button'

export function ResumeSection() {
    const pdfUrl = asset('AdrianEddy.pdf')

    return (
        <section id="resume" className="py-8 px-8">
            <div className="max-w-[1400px] mx-auto">
                {/* Editorial pass: Poly at normal weight, consistent with the
                    other section headings. Bold serif at this size reads heavy. */}
                <h2 className="text-center font-poly text-ink text-[2rem] font-normal mb-5">
                    Resume
                </h2>
                <div className="flex gap-3 justify-center mb-5 flex-wrap">
                    <Button
                        variant="secondary"
                        onClick={() => window.open(pdfUrl, '_blank')}
                    >
                        Open Full Screen
                    </Button>
                    <LinkButton href={pdfUrl} variant="secondary" download>
                        Download PDF
                    </LinkButton>
                </div>
                <div className="rounded-sm overflow-hidden bg-bg-light border border-border w-full h-[700px] max-sm:h-[500px]">
                    <iframe
                        src={pdfUrl}
                        title="Adrian Eddy Resume PDF"
                        className="w-full h-full border-none"
                    />
                </div>
            </div>
        </section>
    )
}
