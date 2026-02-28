import { HeroSection } from '../components/hero/HeroSection'
import { InteractiveDemosSection } from '../components/demos/InteractiveDemosSection'
import { ProjectsSection } from '../components/projects/ProjectsSection'
import { ResumeSection } from '../components/resume/ResumeSection'

export function HomePage() {
    return (
        <>
            <HeroSection />
            <InteractiveDemosSection />
            <ProjectsSection />
            <ResumeSection />
        </>
    )
}
