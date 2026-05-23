import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Hero } from '../components/editorial/Hero'
import { About } from '../components/editorial/About'
import { Projects } from '../components/editorial/Projects'
import { Demos } from '../components/editorial/Demos'
import { ResumePDF } from '../components/editorial/ResumePDF'
import { scrollTo } from '../lib/scroll'

interface NavState {
    scrollTo?: string
}

export function HomePage() {
    const location = useLocation()
    const navigate = useNavigate()

    // If we arrived here from another route with a scroll target in state,
    // scroll once the page has mounted — no setTimeout race. We then clear
    // the state via replace() so a refresh doesn't re-trigger it.
    useEffect(() => {
        const state = location.state as NavState | null
        const target = state?.scrollTo
        if (!target) return
        scrollTo(target)
        navigate(location.pathname, { replace: true, state: null })
    }, [location, navigate])

    return (
        <>
            <Hero />
            <About />
            <Demos />
            <Projects />
            <ResumePDF />
        </>
    )
}
