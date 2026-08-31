import { useApiResource } from '../../hooks/useApiResource'
import { Connect4Inline } from './Connect4Inline'
import { LightDemo } from './LightDemo'

const STATUS_LABEL = {
    online: 'Hardware online',
    offline: 'Hardware offline',
    probing: 'Probing Pi…',
} as const

export function Demos() {
    const { tone } = useApiResource<unknown>('/stats.json')
    const status = { tone, label: STATUS_LABEL[tone] }

    return (
        <section
            id="demos"
            className="px-8 py-10 border-t border-rule-strong relative max-md:px-5 max-md:py-8 max-sm:px-4 max-sm:py-6"
        >
            <div className="grid grid-cols-[1.1fr_1fr] gap-8 max-md:grid-cols-1 max-md:gap-5">
                <LightDemo apiStatus={status} />
                <Connect4Inline />
            </div>
        </section>
    )
}
