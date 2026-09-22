import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Demos } from '../components/editorial/Demos'
import { Hero } from '../components/editorial/Hero'
import { Projects } from '../components/editorial/ProjectsIndex'
import { Reading } from '../components/editorial/Reading'
import { ResumePDF } from '../components/editorial/ResumePDF'
import { scrollToWhenSettled } from '../lib/scroll'

interface NavState {
    scrollTo?: string
}

export function HomePage() {
    const location = useLocation()
    const navigate = useNavigate()

    // If we arrived here from another route with a scroll target in state,
    // scroll once the page has mounted — no setTimeout race. We then clear
    // the state via replace() so a refresh doesn't re-trigger it; the settle
    // observer keeps the target aligned while data-loaded sections arrive.
    useEffect(() => {
        const state = location.state as NavState | null
        const target = state?.scrollTo
        if (!target) return
        scrollToWhenSettled(target)
        navigate(location.pathname, { replace: true, state: null })
    }, [location, navigate])

    return (
        <>
            <Hero />
            <Demos />
            <Reading />
            <Projects />
            <ResumePDF />
        </>
    )
}
