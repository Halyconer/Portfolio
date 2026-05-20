import { LightingDemoCard } from './LightingDemoCard'
import { Connect4DemoCard } from './Connect4DemoCard'
import { ArchitectureNote } from './ArchitectureNote'
import { Connect4Modal } from './Connect4Modal'
import { LinkButton } from '../ui/Button'
import { useConnect4 } from '../../hooks/useConnect4'
import { scrollTo } from '../../lib/scroll'

export function InteractiveDemosSection() {
    const connect4 = useConnect4()

    return (
        <section id="light-greeting" className="py-8 px-0.5 mt-4 border-t border-border">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex justify-between items-baseline mb-6 px-0.5">
                    <p className="text-[0.7rem] tracking-[0.22em] uppercase text-muted font-inter">
                        Live demos
                    </p>
                    <p className="text-[0.7rem] text-muted/50 font-inter">
                        Server online
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 mb-2 max-md:grid-cols-1">
                    <LightingDemoCard />
                    <Connect4DemoCard
                        onPlay={() => connect4.setIsOpen(true)}
                    />
                </div>

                <ArchitectureNote />

                <div className="flex gap-6 justify-center mt-4 mb-1 flex-wrap">
                    <a
                        href="#resume"
                        onClick={(e) => { e.preventDefault(); scrollTo('resume') }}
                        className="text-[0.8rem] text-muted hover:text-ink transition-colors duration-200 no-underline tracking-[0.06em]"
                    >
                        Work experience →
                    </a>
                    <a
                        href="#projects"
                        onClick={(e) => { e.preventDefault(); scrollTo('projects') }}
                        className="text-[0.8rem] text-muted hover:text-ink transition-colors duration-200 no-underline tracking-[0.06em]"
                    >
                        More projects →
                    </a>
                </div>
            </div>

            <Connect4Modal state={connect4} />
        </section>
    )
}
