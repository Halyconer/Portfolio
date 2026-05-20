import { ProfileImage } from './ProfileImage'
import { LinkButton } from '../ui/Button'
import { scrollTo } from '../../lib/scroll'

// Editorial pass:
//   - Removed the Typewriter and its staggered reveal (delay: 0.5/2.5/3.5/4.5).
//     The old hero kept users waiting ~5s before they could read the page.
//     Now everything is just there on load.
//   - Removed the headline gradient (`from-heading to-#3a7ca5 bg-clip-text
//     text-transparent`). Solid ink color reads as more confident.
//   - Removed `animate-gentle-glow` on the primary CTA. Constant pulsing
//     "PLEASE CLICK ME" buttons are an AI-portfolio cliche.
//   - Body paragraphs no longer use `font-poly` (the wrapper now defaults to
//     Inter); the heading keeps font-poly because that's where Poly earns its
//     keep — a confident humanist serif at display size.
//   - `text-justify` removed; left-aligned ragged-right is calmer.
//   - CTA labels changed: "Skip to Resume" -> "Resume" and "Try me!" -> "Live
//     demos". Less command-y, more editorial.
export function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-[5%] mb-8 overflow-hidden lg:mt-8 max-sm:px-[5%] max-sm:mt-20 max-sm:min-h-[calc(100vh-80px)] max-xs:px-[3%] max-xs:mt-15 max-xs:min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between gap-8 max-w-[1400px] w-full flex-row-reverse max-md:flex-col max-md:gap-6 max-sm:gap-2 max-xs:gap-1">
                <ProfileImage />

                <div className="flex-1 max-w-[800px]">
                    <p className="text-[0.7rem] tracking-[0.22em] uppercase text-muted mb-5 font-inter max-xs:text-[0.65rem]">
                        Economics &middot; NYU &middot; New York
                    </p>

                    <h1 className="text-[3.2rem] font-normal mb-6 leading-[0.95] text-heading font-poly lg:text-[4.5rem] max-md:text-[3.2rem] max-sm:text-[2.6rem] max-xs:text-[2.1rem] whitespace-nowrap">
                        Adrian Eddy.
                    </h1>

                    <p className="text-[1rem] text-muted mb-6 leading-relaxed lg:text-[1.05rem] max-w-[520px]">
                        Econ major with a focus on{' '}
                        <span className="text-ink font-normal">econometrics</span> and{' '}
                        <span className="text-ink font-normal">financial markets</span>.
                        Building things at the intersection of economics and
                        software — trading systems, IoT, and a behavioral
                        finance thesis.
                    </p>

                    <p className="text-[0.85rem] text-muted mb-8 tracking-[0.05em]">
                        <a
                            href="mailto:ae2422@nyu.edu"
                            className="text-muted hover:text-ink underline decoration-1 underline-offset-4 transition-colors"
                        >
                            ae2422@nyu.edu
                        </a>
                    </p>

                    <div className="flex gap-3 flex-wrap max-xs:flex-col max-xs:items-center max-xs:gap-2">
                        <LinkButton
                            href="#resume"
                            variant="primary"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollTo('resume')
                            }}
                            className="max-xs:w-full max-xs:max-w-[200px]"
                        >
                            Resume
                        </LinkButton>
                        <LinkButton
                            href="#light-greeting"
                            variant="secondary"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollTo('light-greeting')
                            }}
                            className="max-xs:w-full max-xs:max-w-[200px]"
                        >
                            Live demos
                        </LinkButton>
                    </div>
                </div>
            </div>
        </section>
    )
}
