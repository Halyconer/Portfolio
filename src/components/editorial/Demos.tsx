import { Link } from 'react-router-dom'
import { useApiResource } from '../../hooks/useApiResource'
import { Connect4Inline } from './Connect4Inline'
import { LightDemo } from './LightDemo'
import { SectionEyebrow } from './SectionEyebrow'
import { StatusDot } from './StatusDot'

const STATUS_LABEL = {
    online: 'Hardware online',
    offline: 'Hardware offline',
    probing: 'Probing Pi…',
} as const

export function Demos() {
    // A single probe backs both the section-header pill and the LightDemo
    // card pill, so the page can't claim "online" in one spot and "offline"
    // in another.
    const { tone } = useApiResource<unknown>('/stats.json')
    const status = { tone, label: STATUS_LABEL[tone] }

    return (
        <section
            id="demos"
            className="section-dark px-8 py-20 border-t border-rule-strong relative max-md:px-5 max-md:py-12 max-sm:px-4 max-sm:py-10"
        >
            <div className="flex justify-between items-baseline mb-8 gap-6 max-md:flex-col max-md:items-start max-md:gap-3">
                <div>
                    <SectionEyebrow
                        numeral="02"
                        label="Live, in the browser"
                        className="mb-2"
                    />
                    <h2 className="font-serif font-normal text-[3.5rem] tracking-[-0.03em] m-0 leading-[1.05] text-ink max-md:text-[2.5rem] max-sm:text-[2rem]">
                        Two things you can{' '}
                        <em className="italic text-accent">touch</em>.
                    </h2>
                </div>
                <div className="text-eyebrow whitespace-nowrap">
                    <StatusDot tone={status.tone}>{status.label}</StatusDot>
                </div>
            </div>

            <div className="grid grid-cols-[1.1fr_1fr] gap-8 max-md:grid-cols-1 max-md:gap-5">
                <LightDemo apiStatus={status} />
                <Connect4Inline />
            </div>

            <div className="mt-8 pt-5 border-t border-rule flex justify-between items-baseline text-eyebrow-sm gap-3 flex-wrap">
                <span>
                    Both demos: ngrok &rarr; nginx &rarr; Flask on Raspberry Pi.
                </span>
                <Link
                    to="/dev-roadtrip"
                    className="text-accent underline decoration-1 underline-offset-4 hover:text-accent-deep transition-colors"
                >
                    See the architecture &rarr;
                </Link>
            </div>
        </section>
    )
}
