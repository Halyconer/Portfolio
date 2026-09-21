import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Colophon } from './components/ui/Colophon'
import { Masthead } from './components/ui/Masthead'

export function App() {
    const location = useLocation()

    // Reset scroll on route change. Hash router doesn't do this automatically,
    // and arriving at /creative scrolled halfway down the page feels broken.
    // Keyed to pathname only: when a scrollTo target is queued, HomePage
    // clears that state on the same route, and reacting to the state change
    // would yank the page back to the top mid-scroll.
    useEffect(() => {
        const state = location.state as { scrollTo?: string } | null
        if (state?.scrollTo) return
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <div className="bg-paper text-ink min-h-screen relative">
            <div className="relative z-10 max-w-page mx-auto">
                <Masthead />
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
                <Colophon />
            </div>
        </div>
    )
}
