import { Outlet, useLocation } from 'react-router-dom'
import { Masthead } from './components/editorial/Masthead'
import { Colophon } from './components/editorial/Colophon'

export function App() {
    const location = useLocation()
    const isHome = location.pathname === '/'

    return (
        <div className="bg-paper text-ink min-h-screen relative">
            <div className="relative z-10 max-w-[1400px] mx-auto">
                <Masthead variant={isHome ? 'full' : 'minimal'} />
                <Outlet />
                <Colophon />
            </div>
        </div>
    )
}
