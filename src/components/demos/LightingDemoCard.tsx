import { Link } from 'react-router-dom'
import { useLighting } from '../../hooks/useLighting'
import { DemoCard } from '../ui/DemoCard'
import { Button } from '../ui/Button'

export function LightingDemoCard() {
    const { brightness, setBrightness, status, isSending, sendBrightness } =
        useLighting()

    return (
        <DemoCard>
            <div>
                <h3 className="text-slate-dark text-[1.8rem] font-semibold m-0 mb-0.5">
                    Wake Me Up
                </h3>
                <p className="text-primary text-[0.95rem] font-medium m-0 mb-0.5">
                    Control my bedroom lights
                </p>
            </div>
            <div>
                <p className="text-slate-muted text-[0.9rem] leading-snug m-0 mb-1 text-justify max-sm:text-left">
                    A live lighting control system via Flask API running on my
                    Raspberry Pi. This could literally wake me up so I should
                    probably implement a timer or something... Navigate to{' '}
                    <Link
                        to="/dev-roadtrip"
                        className="text-link hover:text-link-dark hover:underline"
                    >
                        More
                    </Link>{' '}
                    to see how I built the architecture behind this, and
                    lightbulb metrics.{' '}
                    <a
                        href="https://github.com/Halyconer/Welcome-to-my-Portfolio/tree/main/backend"
                        target="_blank"
                        rel="noopener"
                        className="text-primary font-medium hover:underline"
                    >
                        View code
                    </a>
                </p>

                <div className="bg-white rounded-lg p-5 shadow-[0_2px_8px_rgba(0,41,162,0.06)] my-4">
                    <div className="flex justify-between items-baseline mb-2 text-slate-dark">
                        <span className="text-[0.9rem] uppercase tracking-wider opacity-70">
                            Brightness
                        </span>
                        <div className="text-base font-extralight text-primary">
                            <span>{brightness}</span>%
                        </div>
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

                <Button
                    onClick={sendBrightness}
                    disabled={isSending}
                >
                    {isSending ? 'Sending...' : 'ZAP'}
                </Button>

                <p className="mt-2 text-[0.85rem] text-slate-muted min-h-4">
                    {status}
                </p>
            </div>
        </DemoCard>
    )
}
