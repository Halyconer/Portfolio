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
        <div className="p-8 relative border border-rule bg-paper-warm flex flex-col max-sm:p-5">
            <div className="flex justify-between items-baseline mb-4 gap-3">
                <h3 className="font-serif font-light text-heading m-0 text-ink">
                    Turn on the light under my desk.
                </h3>
                <StatusDot tone={apiStatus.tone}>
                    <span className="text-xs text-muted whitespace-nowrap">
                        {apiStatus.label}
                    </span>
                </StatusDot>
            </div>

            {/* Visualised bulb — pure CSS glow keyed to the picker state.
             * Provides instant visual feedback even before the server responds. */}
            <div
                className="mt-6 flex-1 min-h-[200px] flex items-center justify-center relative border border-rule bg-paper transition-[background] duration-[400ms] max-sm:min-h-[150px]"
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
                <div className="absolute bottom-3 right-3.5 text-xs text-status-online tabular-nums">
                    ● {Math.round(hue)}° · {Math.round(saturation)}%
                </div>
            </div>

            {/* Sliders in normal flow — sit right below the visualization */}
            <div className="mt-5 flex flex-col gap-4">
                <div className="w-full">
                    <label
                        htmlFor="hue-slider"
                        className="block text-xs text-muted mb-1.5"
                    >
                        Hue — {Math.round(hue)}°
                    </label>
                    <Hue
                        hue={hue}
                        width="100%"
                        height={14}
                        radius="0"
                        onChange={(c) => setHue(c.h)}
                    />
                </div>
                <div className="w-full">
                    <label
                        htmlFor="brightness-slider"
                        className="block text-xs text-muted mb-1.5"
                    >
                        Brightness — {brightness}%
                    </label>
                    <input
                        id="brightness-slider"
                        type="range"
                        min={1}
                        max={100}
                        value={brightness}
                        onChange={(e) => setBrightness(+e.target.value)}
                        className="brightness-slider w-full"
                    />
                </div>
            </div>

            {/* mt-auto pins the footer to the card bottom, matching Connect4's
             * baseline. Negative margins cancel the card padding so the actions
             * sit flush with the card frame — a hairline footer, not floating
             * blocks. */}
            <div className="mt-auto pt-4">
                <p
                    role="status"
                    aria-live="polite"
                    className="mb-3 text-xs text-muted min-h-5 leading-5 text-right"
                >
                    {status}
                </p>
                <div className="-mx-8 -mb-8 max-sm:-mx-5 max-sm:-mb-5 border-t border-rule flex">
                    <button
                        type="button"
                        onClick={sendBrightness}
                        disabled={isSending}
                        className="btn-reset flex-1 py-3.5 px-5 text-sm text-ink enabled:hover:bg-ink enabled:hover:text-paper transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSending ? 'Sending…' : 'Set brightness'}
                    </button>
                    <button
                        type="button"
                        onClick={sendColor}
                        disabled={isSending}
                        className="btn-reset flex-1 py-3.5 px-5 text-sm text-ink border-l border-rule enabled:hover:bg-ink enabled:hover:text-paper transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Set color
                    </button>
                </div>
            </div>
        </div>
    )
}
