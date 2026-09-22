import { getGreeting } from '../../lib/greeting'
import { scrollTo } from '../../lib/scroll'

export function Hero() {
    const greeting = getGreeting()

    return (
        <section
            id="top"
            className="px-8 pt-6 pb-8 relative max-md:px-5 max-md:pt-5 max-md:pb-6 max-sm:px-4 max-sm:pt-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 lg:gap-10 items-stretch">
                {/* Left Column: Text & CTA */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="font-serif font-normal text-ink m-0 text-display">
                            {greeting},
                        </h1>

                        <p className="mt-5 measure font-serif font-light text-ink text-lg leading-relaxed m-0">
                            My name is Adrian, and thank you so much for taking
                            the time to visit my little nook on the web. Beyond
                            telling you a little about myself through my work, I
                            hope that this minor detour of yours turns out to be
                            a little fun! That's basically the entire premise of
                            this website, but if you prefer a traditional
                            résumé, you can find mine{' '}
                            <a
                                href="#resume"
                                onClick={(e) => {
                                    e.preventDefault()
                                    scrollTo('resume')
                                }}
                                className="link-underline"
                            >
                                here
                            </a>
                            . If you have any questions regarding what I do, why
                            I do it, how I do it, or anything else for that
                            matter, please contact me at your earliest
                            convenience:{' '}
                            <a
                                href="mailto:business@adrianeddy.com"
                                className="link-quiet underline"
                            >
                                business@adrianeddy.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right column portrait: on md+ the image is absolutely
                 * positioned so the text column alone sets the row height and
                 * both columns' edges stay flush. */}
                <div className="relative bg-paper-warm border border-rule p-3 max-w-[300px] w-full mx-auto md:mr-0">
                    <img
                        src="/assets/headshot.jpg"
                        alt="Adrian Eddy"
                        loading="eager"
                        fetchPriority="high"
                        className="w-full aspect-[4/5] object-cover border border-rule-strong md:absolute md:inset-3 md:w-[calc(100%-1.5rem)] md:h-[calc(100%-1.5rem)] md:aspect-auto"
                    />
                </div>
            </div>
        </section>
    )
}
