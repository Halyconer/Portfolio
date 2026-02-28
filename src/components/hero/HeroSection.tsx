import { motion } from 'framer-motion'
import { Typewriter } from './Typewriter'
import { ProfileImage } from './ProfileImage'
import { LinkButton } from '../ui/Button'
import { scrollTo } from '../../lib/scroll'
import { fadeInUp, slideInFromLeft } from '../../lib/animations'

export function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-[5%] mb-8 overflow-hidden lg:mt-8 max-sm:px-[5%] max-sm:mt-20 max-sm:min-h-[calc(100vh-80px)] max-xs:px-[3%] max-xs:mt-15 max-xs:min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between gap-8 max-w-[1400px] w-full flex-row-reverse max-md:flex-col max-md:gap-6 max-sm:gap-2 max-xs:gap-1">
                <ProfileImage />

                <div className="flex-1 max-w-[800px]">
                    <motion.h1
                        className="text-[4rem] font-semibold mb-2 leading-[1.1] bg-gradient-to-br from-heading to-[#3a7ca5] bg-clip-text text-transparent min-h-[4.4rem] font-poly lg:text-[6rem] lg:min-h-[6.6rem] max-md:text-[4.5rem] max-sm:text-[3.5rem] max-xs:text-[2.8rem] max-xs:min-h-[3.2rem]"
                        variants={slideInFromLeft}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            delay: 0.5,
                            duration: 1.2,
                            ease: 'easeOut',
                        }}
                    >
                        <Typewriter
                            phrases={["Hi, I'm Adrian.", 'Nice 2 meet u.']}
                        />
                    </motion.h1>

                    <motion.p
                        className="text-2xl text-muted my-4 font-normal font-poly lg:text-[2rem] max-xs:text-base"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            delay: 2.5,
                            duration: 1,
                            ease: 'easeOut',
                        }}
                    >
                        Economics @ NYU
                    </motion.p>

                    <motion.p
                        className="text-[0.95rem] text-muted mb-3 text-justify leading-relaxed font-poly max-sm:text-left lg:text-[1.3rem]"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            delay: 3.5,
                            duration: 1,
                            ease: 'easeOut',
                        }}
                    >
                        I am an Econ major with a passion for econometrics,
                        financial markets, and programming. As of right now, I
                        am learning more about IoT systems and AI Development
                        with practical applications in trading and automation,
                        while also exploring market anomalies and behavioral
                        finance in my thesis.
                    </motion.p>

                    <motion.p
                        className="text-[0.95rem] text-muted mb-3 text-justify leading-relaxed font-poly max-sm:text-left lg:text-[1.3rem]"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            delay: 3.5,
                            duration: 1,
                            ease: 'easeOut',
                        }}
                    >
                        Let&apos;s connect:{' '}
                        <a
                            href="mailto:ae2422@nyu.edu"
                            className="text-link hover:text-link-dark hover:underline"
                        >
                            ae2422@nyu.edu
                        </a>
                    </motion.p>

                    <motion.div
                        className="flex gap-3 mt-6 flex-wrap max-xs:flex-col max-xs:items-center max-xs:gap-2"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            delay: 4.5,
                            duration: 1,
                            ease: 'easeOut',
                        }}
                    >
                        <LinkButton
                            href="#resume"
                            variant="secondary"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollTo('resume')
                            }}
                            className="lg:py-5 lg:px-10 lg:text-[1.1rem] max-xs:w-full max-xs:max-w-[200px] max-xs:py-3 max-xs:px-5 max-xs:text-[0.85rem]"
                        >
                            Skip to Resume
                        </LinkButton>
                        <LinkButton
                            href="#light-greeting"
                            variant="primary"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollTo('light-greeting')
                            }}
                            className="animate-gentle-glow hover:animate-none lg:py-5 lg:px-10 lg:text-[1.1rem] max-xs:w-full max-xs:max-w-[200px] max-xs:py-3 max-xs:px-5 max-xs:text-[0.85rem]"
                        >
                            Try me!
                        </LinkButton>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
