import { Link } from 'react-router-dom'
import { useLighting } from '../../hooks/useLighting'
import { Connect4Inline } from './Connect4Inline'
import { SectionEyebrow } from './SectionEyebrow'
import { StatusDot } from './StatusDot'

function LightDemo() {
    const { brightness, setBrightness, status, isSending, sendBrightness } =
        useLighting()
    const glow = 0.25 + (brightness / 100) * 0.45

    return (
        <div
            className="p-8 relative border border-rule bg-[linear-gradient(135deg,rgba(179,74,31,0.04),transparent_60%)] max-sm:p-5"
        >
            <div className="flex justify-between items-baseline font-mono text-[10px] tracking-[0.18em] uppercase text-muted mb-3 gap-3 flex-wrap">
                <span>Demo 01 &mdash; Smart Light &middot; LIFX + Pi</span>
                <span className="text-status-online">● API online</span>
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
                    onClick={sendBrightness}
                    disabled={isSending}
                    className="bg-ink text-paper border-none py-3 px-5 font-mono text-[11px] tracking-[0.16em] uppercase cursor-pointer hover:bg-ink-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSending ? 'Sending…' : 'ZAP'}
                </button>
                <div className="flex-1 ml-3 max-sm:ml-0 max-sm:w-full">
                    <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-1.5">
                        Brightness &middot; {brightness}%
                    </div>
                    <input
                        type="range"
                        min={1}
                        max={100}
                        value={brightness}
                        onChange={(e) => setBrightness(+e.target.value)}
                        className="brightness-slider"
                        title="Adjust Brightness"
                    />
                </div>
            </div>

            <p className="mt-3 text-[0.8rem] text-muted font-mono min-h-[1rem]">
                {status}
            </p>
        </div>
    )
}

export function Demos() {
    return (
        <section
            id="demos"
            className="px-8 py-20 bg-paper-warm border-t border-rule-strong relative max-md:px-5 max-md:py-12 max-sm:px-4 max-sm:py-10"
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
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted whitespace-nowrap">
                    <StatusDot>Hardware online</StatusDot>
                </div>
            </div>

            <div className="grid grid-cols-[1.1fr_1fr] gap-8 max-md:grid-cols-1 max-md:gap-5">
                <LightDemo />
                <Connect4Inline />
            </div>

            <div className="mt-8 pt-5 border-t border-rule flex justify-between items-baseline font-mono text-[10px] tracking-[0.18em] uppercase text-muted gap-3 flex-wrap">
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
