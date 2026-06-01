import { useLighting } from '../../hooks/useLighting'
import type { StatusTone } from './StatusDot'

interface LightDemoProps {
    apiStatus: { tone: StatusTone; label: string }
}

const PILL_COLOR: Record<StatusTone, string> = {
    online: 'var(--color-status-online)',
    offline: 'var(--color-accent-deep)',
    probing: 'var(--color-muted-hi)',
}

const PILL_LABEL: Record<StatusTone, string> = {
    online: 'API online',
    offline: 'API offline',
    probing: 'Checking…',
}

export function LightDemo({ apiStatus }: LightDemoProps) {
    const { brightness, setBrightness, status, isSending, sendBrightness } =
        useLighting()
    const glow = 0.25 + (brightness / 100) * 0.45

    return (
        <div
            className="p-8 relative border border-rule bg-[linear-gradient(135deg,rgba(179,74,31,0.04),transparent_60%)] max-sm:p-5"
        >
            <div className="flex justify-between items-baseline text-eyebrow-sm mb-3 gap-3 flex-wrap">
                <span>Demo 01 &mdash; Smart Light &middot; LIFX + Pi</span>
                <span style={{ color: PILL_COLOR[apiStatus.tone] }}>
                    &#9679; {PILL_LABEL[apiStatus.tone]}
                </span>
            </div>
            <h3 className="font-serif font-light text-[2.2rem] tracking-[-0.02em] m-0 text-ink max-sm:text-[1.6rem]">
                Turn on the light under my desk.
            </h3>
            <p className="mt-3 text-muted text-[0.95rem] leading-[1.55] measure">
                A live lighting control system via Flask API on my Raspberry Pi.
                Could literally wake me up — so I should probably implement a
                timer.{' '}
                <a
                    href="https://github.com/Halyconer/Welcome-to-my-Portfolio/tree/main/backend"
                    target="_blank"
                    rel="noopener"
                    className="text-ink underline decoration-1 underline-offset-2 hover:text-accent transition-colors"
                >
                    View code
                </a>
            </p>

            {/* Visualised bulb — pure CSS glow keyed to the brightness state.
             * Provides instant visual feedback even before the server responds. */}
            <div
                className="mt-6 h-[200px] flex items-center justify-center relative border border-rule transition-[background] duration-[400ms] max-sm:h-[150px]"
                style={{
                    background: `radial-gradient(circle at 50% 45%, rgba(255,200,40,${glow * 0.5}), transparent 60%)`,
                }}
            >
                <div
                    className="w-[90px] h-[90px] rounded-full max-sm:w-[64px] max-sm:h-[64px]"
                    style={{
                        background: 'var(--color-player-yellow)',
                        boxShadow: `0 0 ${30 + brightness * 0.6}px rgba(255,200,40,${0.4 + (brightness / 100) * 0.45}), 0 0 30px rgba(255,200,40,0.85)`,
                        opacity: 0.55 + (brightness / 100) * 0.45,
                        transition: 'all 0.3s',
                    }}
                />
                <div className="absolute bottom-3 right-3.5 font-mono text-[11px] text-status-online tabular-nums">
                    ● ON &nbsp; brightness={brightness}%
                </div>
            </div>

            <div className="flex gap-3 mt-5 items-center max-sm:flex-wrap">
                <button
                    type="button"
                    onClick={sendBrightness}
                    disabled={isSending}
                    className="bg-ink text-paper border-none py-3 px-5 font-mono text-[11px] tracking-[0.16em] uppercase cursor-pointer hover:bg-ink-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSending ? 'Sending…' : 'ZAP'}
                </button>
                <div className="flex-1 ml-3 max-sm:ml-0 max-sm:w-full">
                    <label
                        htmlFor="brightness-slider"
                        className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-1.5"
                    >
                        Brightness &middot; {brightness}%
                    </label>
                    <input
                        id="brightness-slider"
                        type="range"
                        min={1}
                        max={100}
                        value={brightness}
                        onChange={(e) => setBrightness(+e.target.value)}
                        className="brightness-slider"
                    />
                </div>
            </div>

            <p
                role="status"
                aria-live="polite"
                className="mt-3 text-[0.8rem] text-muted font-mono min-h-[1rem]"
            >
                {status}
            </p>
        </div>
    )
}
