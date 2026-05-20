import { useNavigate, useLocation } from 'react-router-dom'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollTo } from '../../lib/scroll'

const sectionIds = ['light-greeting', 'projects', 'resume']

export function FloatingNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === '/'
    const isEcommerce = location.pathname === '/e-commerce'
    const activeId = useActiveSection(isHome ? sectionIds : [])

    const goHome = (e: React.MouseEvent) => {
        e.preventDefault()
        if (isHome) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate('/')
        }
    }

    const goResume = (e: React.MouseEvent) => {
        e.preventDefault()
        if (isHome) {
            scrollTo('resume')
        } else {
            navigate('/')
            setTimeout(() => scrollTo('resume'), 100)
        }
    }

    const goMore = (e: React.MouseEvent) => {
        e.preventDefault()
        navigate('/dev-roadtrip')
        window.scrollTo({ top: 0 })
    }

    const goEcommerce = (e: React.MouseEvent) => {
        e.preventDefault()
        navigate('/e-commerce')
        window.scrollTo({ top: 0 })
    }

    // Editorial pass: hover state is now a 1px underline appearing beneath the
    // word (via border-b on a transparent border that becomes ink on hover).
    // The old style was a rounded pill highlight with a blue tint background —
    // too SaaS-y. The underline pattern is what magazine navigation actually
    // looks like.
    const linkBase =
        'text-ink font-medium py-2 px-3 transition-colors duration-200 no-underline border-b border-transparent hover:border-ink max-xs:py-1.5 max-xs:px-2 max-xs:text-[0.9rem] cursor-pointer'
    const activeClass = 'border-ink'

    return (
        // Translucent dark page color so the nav sits over content with a
        // glassy fade instead of a hard bar. Hairline border below.
        <nav className="fixed top-0 left-0 right-0 bg-[#111008]/85 backdrop-blur-[10px] z-1000 py-4 border-b border-border">
            <ul className="flex justify-center gap-8 list-none m-0 p-0 max-xs:gap-4 max-xs:flex-wrap max-xs:py-2 max-xs:px-4">
                <li>
                    <a
                        href="#/"
                        onClick={goHome}
                        className={`${linkBase} ${isHome && !activeId ? activeClass : ''}`}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="#/resume"
                        onClick={goResume}
                        className={`${linkBase} ${isHome && activeId === 'resume' ? activeClass : ''}`}
                    >
                        Resume
                    </a>
                </li>
                <li>
                    <a
                        href="#/dev-roadtrip"
                        onClick={goMore}
                        className={`${linkBase} ${!isHome && !isEcommerce ? activeClass : ''}`}
                    >
                        More
                    </a>
                </li>
                <li>
                    <span
                        className="text-muted font-medium py-2 px-3 border-b border-transparent cursor-not-allowed opacity-40 text-[0.95rem] max-xs:py-1.5 max-xs:px-2 max-xs:text-[0.9rem]"
                        title="Coming soon"
                    >
                        Photography
                    </span>
                </li>
            </ul>
        </nav>
    )
}
