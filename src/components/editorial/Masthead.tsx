import { useNavigate, useLocation, Link } from 'react-router-dom'
import { scrollTo } from '../../lib/scroll'

interface MastheadProps {
    variant?: 'full' | 'minimal' | 'bare'
}

const sectionNav: Array<{ label: string; target: string }> = [
    { label: 'Home', target: 'top' },
    { label: 'Demos', target: 'demos' },
    { label: 'Work', target: 'work' },
    { label: 'Résumé', target: 'resume' },
]

export function Masthead({ variant = 'full' }: MastheadProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === '/'

    // When already on home, scroll directly. When elsewhere, navigate home and
    // pass the target via location state — `HomePage` reads it on mount and
    // scrolls once the DOM exists. This replaces a brittle setTimeout(100)
    // race that assumed render completed within 100ms.
    const handleSection = (target: string) => {
        if (isHome) {
            scrollTo(target)
        } else {
            navigate('/', { state: { scrollTo: target } })
        }
    }

    return (
        <header className="px-8 py-3 border-b border-rule-strong max-md:px-5 max-sm:px-4">
            {variant === 'full' && (
                <nav className="flex justify-between items-center max-sm:flex-wrap max-sm:gap-3">
                    <div className="flex gap-8 flex-wrap max-sm:gap-5">
                        {sectionNav.map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleSection(item.target)}
                                className="btn-reset text-base font-medium text-ink transition-colors duration-200 hover:text-accent"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <Link
                        to="/creative"
                        className="text-base font-medium text-accent no-underline hover:text-accent-deep transition-colors duration-200"
                    >
                        Creative ↗
                    </Link>
                </nav>
            )}

            {variant === 'minimal' && (
                <Link
                    to="/"
                    className="text-base text-muted no-underline hover:text-accent transition-colors duration-200"
                >
                    ← Back to Portfolio
                </Link>
            )}
        </header>
    )
}
