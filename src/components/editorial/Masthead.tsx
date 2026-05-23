import { useNavigate, useLocation, Link } from 'react-router-dom'
import { scrollTo } from '../../lib/scroll'
import { StatusDot } from './StatusDot'

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
        <header className="px-8 pt-8 max-md:px-5 max-sm:px-4 max-sm:pt-5">
            {/* Brand bar — left: name with terracotta star; right: status pill. */}
            <div className="flex justify-between items-center font-mono text-[11px] tracking-[0.16em] uppercase text-muted gap-4 whitespace-nowrap max-sm:text-[10px]">
                <button
                    type="button"
                    onClick={() => handleSection('top')}
                    className="btn-reset text-ink"
                >
                    <span className="text-accent">※</span> Adrian Eddy
                </button>
                <StatusDot>
                    <span className="max-xs:hidden">
                        Open to Summer &amp; Fall 2026
                    </span>
                    <span className="xs:hidden">Open '26</span>
                </StatusDot>
            </div>

            {/* Editorial double-rule — heavy/hairline pair, the classic magazine masthead divider. */}
            <div className="h-px bg-rule-strong mt-3 mb-0.5" />
            <div className="h-[3px] bg-rule-strong" />

            {/* Section nav. Hidden in minimal variant (non-home pages). */}
            {variant === 'full' && (
                <nav className="flex justify-between items-center pt-3.5 font-mono text-[11px] tracking-[0.18em] uppercase max-sm:text-[10px] max-sm:flex-wrap max-sm:gap-2">
                    <div className="flex gap-7 flex-wrap max-sm:gap-4">
                        {sectionNav.map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleSection(item.target)}
                                className="btn-reset text-ink border-b border-transparent pb-0.5 transition-colors duration-200 hover:border-accent hover:text-accent"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <Link
                        to="/creative"
                        className="text-accent no-underline border-b border-accent pb-0.5 inline-flex items-center gap-2 whitespace-nowrap"
                    >
                        The Creative Page <span className="opacity-70">↗</span>
                    </Link>
                </nav>
            )}

            {variant === 'minimal' && (
                <div className="pt-3.5 font-mono text-[11px] tracking-[0.18em] uppercase">
                    <Link
                        to="/"
                        className="text-ink no-underline border-b border-transparent pb-0.5 hover:border-accent hover:text-accent transition-colors duration-200"
                    >
                        ← Back to Portfolio
                    </Link>
                </div>
            )}
        </header>
    )
}
