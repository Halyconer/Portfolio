import { Link } from 'react-router-dom'
import { useLighting } from '../../hooks/useLighting'
import { DemoCard } from '../ui/DemoCard'
import { Button } from '../ui/Button'

export function LightingDemoCard() {
    const { brightness, setBrightness, status, isSending, sendBrightness } =
        useLighting()

    return (
        <DemoCard>
            <p className="text-[0.68rem] text-muted/40 font-inter tracking-[0.1em] mb-4">01</p>
            <div className="mb-4">
                <h3 className="text-heading text-[1.3rem] font-normal font-poly m-0 mb-1">
                    Wake Me Up
                </h3>
                <p className="text-muted text-[0.8rem] font-inter m-0">
                    Control my bedroom lights
                </p>
            </div>
            <div>
                <p className="text-muted text-[0.85rem] font-inter leading-relaxed m-0 mb-4">
                    A live lighting control system via Flask API running on my
                    Raspberry Pi. This could literally wake me up so I should
                    probably implement a timer or something...{' '}
                    <a
                        href="https://github.com/Halyconer/Welcome-to-my-Portfolio/tree/main/backend"
                        target="_blank"
                        rel="noopener"
                        className="text-ink hover:text-heading underline underline-offset-2 transition-colors"
                    >
                        View code
                    </a>
                </p>

                <div className="p-4 my-4 border border-border" style={{ backgroundColor: '#1c1a10' }}>
                    <div className="flex justify-between items-baseline mb-3">
                        <span className="text-[0.7rem] uppercase tracking-[0.15em] text-muted font-inter">
                            Brightness
                        </span>
                        <span className="text-[0.85rem] text-ink font-inter">
                            {brightness}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={brightness}
                        onChange={(e) =>
                            setBrightness(parseInt(e.target.value))
                        }
                        className="brightness-slider"
                        title="Adjust Brightness"
                    />
                </div>

                <Button onClick={sendBrightness} disabled={isSending}>
                    {isSending ? 'Sending...' : 'ZAP'}
                </Button>

                <p className="mt-2 text-[0.8rem] text-muted font-inter min-h-4">
                    {status}
                </p>
            </div>
        </DemoCard>
    )
}
