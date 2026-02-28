import { asset } from '../../lib/assets'
import { Button, LinkButton } from '../ui/Button'

export function ResumeSection() {
    const pdfUrl = asset('AdrianEddy.pdf')

    return (
        <section id="resume" className="py-6 px-8">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-center text-ink text-[1.75rem] font-bold mb-4">
                    Resume
                </h2>
                <div className="flex gap-4 justify-center mb-4 flex-wrap">
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
                <div className="shadow-[0_2px_10px_rgba(0,0,0,0.08)] rounded overflow-hidden bg-white border border-[#ddd] w-full h-[700px] max-sm:h-[500px]">
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
