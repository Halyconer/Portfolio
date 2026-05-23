import { Outlet, useLocation } from 'react-router-dom'
import { Masthead } from './components/editorial/Masthead'
import { Colophon } from './components/editorial/Colophon'

export function App() {
    const location = useLocation()
    const isHome = location.pathname === '/'
    // /creative renders its own page-specific footer to match the gallery
    // design language; suppress the site-wide colophon there.
    const isCreative = location.pathname === '/creative'

    return (
        <div className="bg-paper text-ink min-h-screen relative">
            <div className="relative z-10 max-w-[1400px] mx-auto">
                <Masthead
                    variant={
                        isHome ? 'full' : isCreative ? 'bare' : 'minimal'
                    }
                />
                <Outlet />
                {!isCreative && <Colophon />}
            </div>
        </div>
    )
}
