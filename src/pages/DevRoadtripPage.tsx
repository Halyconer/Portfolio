import { Section } from '../components/ui/Section'
import { SectionEyebrow } from '../components/ui/SectionEyebrow'
import { StatusDot } from '../components/ui/StatusDot'
import { useApiResource } from '../hooks/useApiResource'
import { asset } from '../lib/assets'

interface Stats {
    total_calls_all_time: number
    avg_brightness_all_time: number
}

interface SpotifyData {
    artists: Array<{ name: string; image_url?: string }>
    last_updated_utc: string
}

function StatCard({ value, label }: { value: React.ReactNode; label: string }) {
    return (
        <div className="bg-paper border border-rule p-6 text-center">
            <div className="font-serif font-light text-[2.6rem] leading-none text-ink tabular-nums">
                {value}
            </div>
            <div className="text-label mt-3">{label}</div>
        </div>
    )
}

const STATS_LABEL = {
    online: 'Live',
    offline: 'Database unreachable',
    probing: 'Fetching…',
} as const

export function DevRoadtripPage() {
    const {
        data: stats,
        error: statsError,
        tone: statsTone,
    } = useApiResource<Stats>('/stats.json')
    const { data: spotifyData, error: spotifyError } =
        useApiResource<SpotifyData>('/spotify_stats.json')

    return (
        <>
            {/* Hero */}
            <Section
                id="top"
                divided={false}
                spacing="none"
                className="pt-12 pb-12 max-md:pt-8 max-sm:pt-6"
            >
                <SectionEyebrow numeral="01" label="The trip so far" />
                <h1 className="font-serif font-normal text-ink m-0 text-hero">
                    My trip
                    <br />
                    so far<span className="text-accent">.</span>
                </h1>
                <p className="mt-6 measure font-serif font-light text-[1.35rem] leading-[1.4] text-ink-soft max-sm:text-[1.1rem]">
                    Getting my toes wet with web development &mdash; one
                    Raspberry Pi, one ngrok tunnel, one nginx reverse proxy, and
                    a Flask app held together with optimism.
                </p>
            </Section>

            {/* Architecture diagram */}
            <Section spacing="roomy" warm>
                <SectionEyebrow numeral="02" label="How it works" />
                <h2 className="font-serif font-normal m-0 text-title text-ink">
                    From your browser to the bulb.
                </h2>
                <div className="mt-8 border border-rule bg-paper p-4 max-w-[1200px] mx-auto">
                    <img
                        src={asset('lightbulb_diagram.jpg')}
                        alt="System architecture: browser → ngrok → nginx → Flask → LIFX bulb"
                        loading="lazy"
                        decoding="async"
                        className="max-w-full h-auto block mx-auto"
                    />
                </div>
            </Section>

            {/* Database stats */}
            <Section spacing="roomy">
                <div className="flex justify-between items-baseline gap-6 mb-8 max-md:flex-col max-md:items-start max-md:gap-3">
                    <div>
                        <SectionEyebrow numeral="03" label="Live database" />
                        <h2 className="font-serif font-normal m-0 text-title text-ink">
                            Numbers from the bulb.
                        </h2>
                    </div>
                    <div className="text-eyebrow whitespace-nowrap">
                        <StatusDot tone={statsTone}>
                            {STATS_LABEL[statsTone]}
                        </StatusDot>
                    </div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
                    <StatCard
                        label="Total calls"
                        value={
                            statsError
                                ? '—'
                                : (stats?.total_calls_all_time ?? '·')
                        }
                    />
                    <StatCard
                        label="Average brightness set"
                        value={
                            statsError
                                ? '—'
                                : (stats?.avg_brightness_all_time?.toFixed(1) ??
                                  '·')
                        }
                    />
                </div>
            </Section>

            {/* Spotify */}
            <Section spacing="roomy" warm>
                <div className="flex justify-between items-baseline gap-6 mb-8 max-md:flex-col max-md:items-start max-md:gap-3">
                    <div>
                        <SectionEyebrow
                            numeral="04"
                            label="Currently in rotation"
                        />
                        <h2 className="font-serif font-normal m-0 text-title text-ink">
                            Listening habits, refreshed daily.
                        </h2>
                        <p className="mt-3.5 measure font-sans text-[0.95rem] leading-[1.55] text-muted">
                            Top artists from the past month, fetched from
                            Spotify&apos;s API by a cron job on the same Pi.
                        </p>
                    </div>
                    {spotifyData && (
                        <div className="text-label whitespace-nowrap">
                            Updated{' '}
                            {new Date(
                                spotifyData.last_updated_utc
                            ).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    )}
                </div>

                <div className="border border-rule bg-paper p-8 max-sm:p-5">
                    {spotifyError || spotifyData?.artists.length === 0 ? (
                        <div className="font-serif italic text-ink-soft text-center py-6">
                            {spotifyError
                                ? 'Musical data temporarily unavailable — the Pi might be taking a break.'
                                : 'No recent listening data — probably too much coding, not enough music.'}
                        </div>
                    ) : !spotifyData ? (
                        <div className="flex items-center justify-center py-8 text-label">
                            <span className="w-4 h-4 border-2 border-rule border-t-ink rounded-full animate-spin-slow mr-3" />
                            Fetching latest listening data…
                        </div>
                    ) : (
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-6">
                            {spotifyData.artists.map((artist) => (
                                <div
                                    key={artist.name}
                                    className="flex flex-col items-center"
                                >
                                    {artist.image_url ? (
                                        <img
                                            src={artist.image_url}
                                            alt={artist.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-20 h-20 rounded-full object-cover mb-2.5 border border-rule"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-paper-warm border border-rule flex items-center justify-center mb-2.5 font-serif italic text-muted text-sm">
                                            ♪
                                        </div>
                                    )}
                                    <div className="text-[0.82rem] text-center leading-tight text-ink-soft font-medium">
                                        {artist.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Section>
        </>
    )
}
