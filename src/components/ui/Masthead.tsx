import { Link, useLocation, useNavigate } from 'react-router-dom'

import { scrollTo } from '../../lib/scroll'

const SECTION_LINKS = [
    { label: 'Home', target: 'top' },
    { label: 'Demos', target: 'demos' },
    { label: 'Work', target: 'work' },
    { label: 'Résumé', target: 'resume' },
]

const NAV_LINK =
    'text-base font-medium no-underline transition-colors duration-200 hover:text-accent'

/**
 * The site masthead — one header on every route. Section links scroll on
 * the home page and navigate home (via location state) from anywhere else.
 * See DESIGN.md.
 */
export function Masthead() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const isHome = pathname === '/'
    const isCreative = pathname === '/creative'

    // On home, scroll directly; elsewhere, navigate home and pass the target
    // via location state — HomePage reads it on mount (no setTimeout race).
    const handleSection = (target: string) => {
        if (isHome) {
            scrollTo(target)
        } else {
            navigate('/', { state: { scrollTo: target } })
        }
    }

    return (
        <header className="px-8 py-3 border-b border-rule-strong max-md:px-5 max-sm:px-4">
            <nav className="flex justify-between items-center max-sm:flex-wrap max-sm:gap-3">
                <div className="flex gap-8 flex-wrap max-sm:gap-5">
                    {SECTION_LINKS.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => handleSection(item.target)}
                            className={`btn-reset text-ink ${NAV_LINK}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
                <Link
                    to="/creative"
                    aria-current={isCreative ? 'page' : undefined}
                    className={`${NAV_LINK} ${
                        isCreative
                            ? 'text-ink underline underline-offset-4 decoration-1'
                            : 'text-muted'
                    }`}
                >
                    Creative
                </Link>
            </nav>
        </header>
    )
}
