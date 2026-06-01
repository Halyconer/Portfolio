import Hue from '@uiw/react-color-hue'
import { useLighting } from '../../hooks/useLighting'
import { StatusDot } from './StatusDot'
import type { StatusTone } from '../../types/status'

interface LightDemoProps {
    apiStatus: { tone: StatusTone; label: string }
}

export function LightDemo({ apiStatus }: LightDemoProps) {
    const {
        brightness,
        setBrightness,
        hue,
        setHue,
        saturation,
        status,
        isSending,
        sendBrightness,
        sendColor,
    } = useLighting()

    // Saturation is pinned to 100% — for LIFX, that's "vivid color"; lower
    // saturation just washes everything out toward white. The Hue slider is
    // the only color control we need.

    // CSS preview of the chosen color — hsl() approximates HSV well enough
    // for a glow visualisation; LIFX's HSBK is converted server-side.
    const lightness = 35 + (brightness / 100) * 25
    const bulbColor = `hsl(${hue}deg, ${saturation}%, ${lightness}%)`
    const glowAlpha = 0.3 + (brightness / 100) * 0.5

    return (
        <div className="p-8 relative border border-rule bg-[linear-gradient(135deg,rgba(179,74,31,0.04),transparent_60%)] max-sm:p-5">
            <div className="flex justify-between items-baseline text-eyebrow-sm mb-3 gap-3 flex-wrap">
                <span>Demo 01 &mdash; Smart Light &middot; LIFX + Pi</span>
                <StatusDot tone={apiStatus.tone}>{apiStatus.label}</StatusDot>
            </div>
            <h3 className="font-serif font-light text-[2.2rem] tracking-[-0.02em] m-0 text-ink max-sm:text-[1.6rem]">
                Turn on the light under my desk.
            </h3>
            <p className="mt-3 text-muted text-[0.95rem] leading-[1.55] measure">
                A live lighting control system via Flask API on my Raspberry Pi.
                Pick a color, set a brightness, send it down the wire.{' '}
                <a
                    href="https://github.com/Halyconer/Welcome-to-my-Portfolio/tree/main/backend"
                    target="_blank"
                    rel="noopener"
                    className="text-ink underline decoration-1 underline-offset-2 hover:text-accent transition-colors"
                >
                    View code
                </a>
            </p>

            {/* Visualised bulb — pure CSS glow keyed to the picker state.
             * Provides instant visual feedback even before the server responds. */}
            <div
                className="mt-6 h-[200px] flex items-center justify-center relative border border-rule transition-[background] duration-[400ms] max-sm:h-[150px]"
                style={{
                    background: `radial-gradient(circle at 50% 45%, hsla(${hue}, ${saturation}%, 60%, ${glowAlpha * 0.5}), transparent 60%)`,
                }}
            >
                <div
                    className="w-[90px] h-[90px] rounded-full max-sm:w-[64px] max-sm:h-[64px]"
                    style={{
                        background: bulbColor,
                        boxShadow: `0 0 ${30 + brightness * 0.6}px hsla(${hue}, ${saturation}%, 60%, ${0.4 + (brightness / 100) * 0.45}), 0 0 30px ${bulbColor}`,
                        opacity: 0.55 + (brightness / 100) * 0.45,
                        transition: 'all 0.3s',
                    }}
                />
                <div className="absolute bottom-3 right-3.5 font-mono text-[11px] text-status-online tabular-nums">
                    ● ON &nbsp; {Math.round(hue)}° &middot; {Math.round(saturation)}%
                </div>
            </div>

            {/* Controls — hue bar and brightness slider share a centered
             * column at the same width, so they read as aligned controls
             * rather than two unrelated widgets. */}
            <div className="mt-5 flex flex-col items-center gap-4">
                <div className="w-full max-w-[320px]">
                    <label
                        htmlFor="hue-slider"
                        className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-1.5 text-center"
                    >
                        Hue &middot; {Math.round(hue)}&deg;
                    </label>
                    <Hue
                        hue={hue}
                        width="100%"
                        height={14}
                        radius="0"
                        onChange={(c) => setHue(c.h)}
                    />
                </div>
                <div className="w-full max-w-[320px]">
                    <label
                        htmlFor="brightness-slider"
                        className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-1.5 text-center"
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
                <div className="flex gap-2 flex-wrap justify-center">
                    <button
                        type="button"
                        onClick={sendBrightness}
                        disabled={isSending}
                        className="bg-ink text-paper border-none py-3 px-5 font-mono text-[11px] tracking-[0.16em] uppercase cursor-pointer hover:bg-ink-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSending ? 'Sending…' : 'Set brightness'}
                    </button>
                    <button
                        type="button"
                        onClick={sendColor}
                        disabled={isSending}
                        className="bg-ink text-paper border-none py-3 px-5 font-mono text-[11px] tracking-[0.16em] uppercase cursor-pointer hover:bg-ink-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Set color
                    </button>
                </div>
            </div>

            <p
                role="status"
                aria-live="polite"
                className="mt-3 text-[0.8rem] text-muted font-mono min-h-[1rem] text-center"
            >
                {status}
            </p>
        </div>
    )
}
