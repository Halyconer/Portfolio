import { useStats } from '../hooks/useStats'
import { useSpotify } from '../hooks/useSpotify'
import { asset } from '../lib/assets'

export function DevRoadtripPage() {
    const { stats, error: statsError } = useStats()
    const { data: spotifyData, error: spotifyError } = useSpotify()

    return (
        <>
            {/* Hero */}
            <section className="text-slate-dark pt-16 pb-8 px-8 text-center flex items-center justify-center flex-col">
                <h1 className="text-[3.5rem] mb-4 font-light tracking-tight text-heading">
                    My Trip So Far
                </h1>
            </section>

            {/* Intro */}
            <section className="py-4 px-4 max-w-[900px] mx-auto text-center">
                <h2 className="text-[2.5rem] text-slate-dark mb-4 font-light">
                    How This Website Works
                </h2>
                <p className="text-[1.1rem] leading-relaxed text-slate-muted mt-4 mb-4">
                    Getting my toes wet with web development and interfaces.
                </p>
            </section>

            {/* Diagram */}
            <section className="bg-white py-8">
                <div className="max-w-[1200px] mx-auto flex justify-center items-center bg-white">
                    <img
                        src={asset('lightbulb_diagram.jpg')}
                        alt="System Architecture Diagram"
                        className="max-w-full h-auto"
                    />
                </div>
            </section>

            {/* Database Stats */}
            <section className="py-4 px-4 max-w-[900px] mx-auto text-center">
                <h2 className="text-[2.5rem] text-slate-dark mb-4 font-light">
                    Live Database Stats
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 my-8">
                    <div className="bg-white rounded-xl p-6 text-center shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-0.5">
                        <div className="text-[2rem] font-semibold text-primary mb-2">
                            {statsError
                                ? 'Error'
                                : stats?.total_calls_all_time ?? '-'}
                        </div>
                        <div className="text-[0.9rem] text-slate-muted uppercase tracking-wider">
                            Total Calls
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-0.5">
                        <div className="text-[2rem] font-semibold text-primary mb-2">
                            {statsError
                                ? 'Error'
                                : stats?.avg_brightness_all_time?.toFixed(2) ??
                                  '-'}
                        </div>
                        <div className="text-[0.9rem] text-slate-muted uppercase tracking-wider">
                            Average Brightness Set
                        </div>
                    </div>
                </div>
            </section>

            {/* Spotify Stats */}
            <section className="bg-bg-light py-16 px-8">
                <div className="max-w-[900px] mx-auto text-center">
                    <h2 className="text-[2.5rem] text-slate-dark mb-4 font-light">
                        Current Listening Habits
                    </h2>
                    <p className="text-[1.1rem] leading-relaxed text-slate-muted mt-4 mb-8">
                        A real-time glimpse into my musical taste. These are my
                        top artists from the past month, refreshed daily via
                        Spotify&apos;s API and a cron job.
                    </p>

                    <div className="bg-white rounded-xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
                        {spotifyError ? (
                            <div className="py-8 opacity-80">
                                Musical data temporarily unavailable — my Pi
                                might be taking a break
                            </div>
                        ) : !spotifyData ? (
                            <div className="flex items-center justify-center p-8 text-[0.9rem] text-slate-muted">
                                <div className="w-5 h-5 border-2 border-[#e0e7ff] border-t-primary rounded-full animate-spin-slow mr-2" />
                                Fetching latest listening data...
                            </div>
                        ) : spotifyData.artists.length === 0 ? (
                            <div className="py-8 opacity-80">
                                No recent listening data
                                available&mdash;perhaps I&apos;ve been too
                                focused on coding!
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-6 mb-6">
                                    {spotifyData.artists.map((artist) => (
                                        <div
                                            key={artist.name}
                                            className="flex flex-col items-center transition-transform duration-300 hover:-translate-y-1"
                                        >
                                            {artist.image_url ? (
                                                <img
                                                    src={artist.image_url}
                                                    alt={artist.name}
                                                    className="w-20 h-20 rounded-full object-cover mb-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-2 border-[#e0e7ff]"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-full bg-[#e8f0fe] text-primary flex items-center justify-center mb-2 text-2xl">
                                                    🎵
                                                </div>
                                            )}
                                            <div className="text-[0.8rem] font-medium text-center leading-tight text-slate-muted">
                                                {artist.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-[0.75rem] opacity-70 mt-4 text-slate-muted">
                                    Last updated:{' '}
                                    {new Date(
                                        spotifyData.last_updated_utc
                                    ).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
