import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Masthead } from './components/editorial/Masthead'
import { Colophon } from './components/editorial/Colophon'
import { ErrorBoundary } from './components/ErrorBoundary'

export function App() {
    const location = useLocation()
    const isHome = location.pathname === '/'
    // /creative renders its own page-specific footer to match the gallery
    // design language; suppress the site-wide colophon there.
    const isCreative = location.pathname === '/creative'

    // Reset scroll on route change. Hash router doesn't do this automatically,
    // and arriving at /creative scrolled halfway down the page feels broken.
    // We skip the reset when a scrollTo target is queued — HomePage will
    // handle that itself in its own effect.
    useEffect(() => {
        const state = location.state as { scrollTo?: string } | null
        if (state?.scrollTo) return
        window.scrollTo(0, 0)
    }, [location.pathname, location.state])

    return (
        <div className="bg-paper text-ink min-h-screen relative">
            <div className="relative z-10 max-w-[1400px] mx-auto">
                <Masthead
                    variant={isHome ? 'full' : isCreative ? 'bare' : 'minimal'}
                />
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
                {!isCreative && <Colophon />}
            </div>
        </div>
    )
}
