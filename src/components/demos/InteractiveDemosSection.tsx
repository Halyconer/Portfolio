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
        <section id="light-greeting" className="py-4 px-0.5 mt-4">
            <div className="max-w-[1200px] mx-auto text-center">
                <h2 className="text-slate-dark text-[2rem] font-bold mb-1">
                    Interactive Demos
                </h2>
                <p className="text-slate-muted text-[0.95rem] mb-4 text-justify leading-snug max-sm:text-left">
                    Two live demos powered by my home server. One could wake me
                    up, the other is just digital matrix fun.
                </p>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-3 mb-2 max-md:grid-cols-1">
                    <LightingDemoCard />
                    <Connect4DemoCard
                        onPlay={() => connect4.setIsOpen(true)}
                    />
                </div>

                <ArchitectureNote />

                <div className="flex gap-2 justify-center mt-2 mb-1 flex-wrap">
                    <LinkButton
                        href="#resume"
                        variant="secondary"
                        onClick={(e) => {
                            e.preventDefault()
                            scrollTo('resume')
                        }}
                        className="py-2 px-4 text-[0.85rem]"
                    >
                        View Work Experience &rarr;
                    </LinkButton>
                    <LinkButton
                        href="#projects"
                        variant="secondary"
                        onClick={(e) => {
                            e.preventDefault()
                            scrollTo('projects')
                        }}
                        className="py-2 px-4 text-[0.85rem]"
                    >
                        See More Projects &rarr;
                    </LinkButton>
                </div>
            </div>

            <Connect4Modal state={connect4} />
        </section>
    )
}
