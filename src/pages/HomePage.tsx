import { Hero } from '../components/editorial/Hero'
import { TLDR } from '../components/editorial/TLDR'
import { About } from '../components/editorial/About'
import { Projects } from '../components/editorial/Projects'
import { Demos } from '../components/editorial/Demos'
import { ResumePDF } from '../components/editorial/ResumePDF'

export function HomePage() {
    return (
        <>
            <Hero />
            <TLDR />
            <About />
            <Projects />
            <Demos />
            <ResumePDF />
        </>
    )
}
