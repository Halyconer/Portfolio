import { useNavigate, useLocation } from 'react-router-dom'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollTo } from '../../lib/scroll'

const sectionIds = ['light-greeting', 'projects', 'resume']

export function FloatingNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === '/'
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

    const linkBase =
        'text-ink font-medium py-2 px-4 rounded transition-all duration-200 no-underline hover:text-primary hover:bg-primary/10 max-xs:py-1.5 max-xs:px-3 max-xs:text-[0.9rem] cursor-pointer'
    const activeClass = 'text-primary bg-primary/10'

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-[10px] z-[1000] py-4 border-b border-black/10">
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
                        className={`${linkBase} ${!isHome ? activeClass : ''}`}
                    >
                        More
                    </a>
                </li>
            </ul>
        </nav>
    )
}
