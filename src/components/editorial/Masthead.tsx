import { useNavigate, useLocation } from 'react-router-dom'
import { scrollTo } from '../../lib/scroll'

interface MastheadProps {
    variant?: 'full' | 'minimal'
}

const sectionNav: Array<{ label: string; target: string }> = [
    { label: 'Home', target: 'top' },
    { label: 'Work', target: 'work' },
    { label: 'Demos', target: 'demos' },
    { label: 'Résumé', target: 'resume' },
]

export function Masthead({ variant = 'full' }: MastheadProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === '/'

    const handleSection = (e: React.MouseEvent, target: string) => {
        e.preventDefault()
        if (!isHome) {
            navigate('/')
            setTimeout(() => {
                if (target === 'top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                    scrollTo(target)
                }
            }, 100)
            return
        }
        if (target === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            scrollTo(target)
        }
    }

    return (
        <header className="px-8 pt-8 max-md:px-5 max-sm:px-4 max-sm:pt-5">
            {/* Brand bar — left: name with terracotta star; right: status pill. */}
            <div className="flex justify-between items-center font-mono text-[11px] tracking-[0.16em] uppercase text-muted gap-4 whitespace-nowrap max-sm:text-[10px]">
                <a
                    href="#/"
                    onClick={(e) => handleSection(e, 'top')}
                    className="text-ink no-underline"
                >
                    <span className="text-accent">&#8251;</span> Adrian Eddy
                </a>
                <span className="flex items-center gap-2.5">
                    <span
                        className="inline-block w-[7px] h-[7px] rounded-full"
                        style={{
                            background: '#3a8c4f',
                            boxShadow: '0 0 8px #3a8c4f',
                        }}
                    />
                    <span className="max-xs:hidden">
                        Open to Summer &amp; Fall 2026
                    </span>
                    <span className="xs:hidden">Open '26</span>
                </span>
            </div>

            {/* Editorial double-rule — heavy/hairline pair, the classic magazine masthead divider. */}
            <div className="h-px bg-rule-strong mt-3 mb-0.5" />
            <div className="h-[3px] bg-rule-strong" />

            {/* Section nav. Hidden in minimal variant (non-home pages). */}
            {variant === 'full' && (
                <nav className="flex justify-between items-center pt-3.5 font-mono text-[11px] tracking-[0.18em] uppercase max-sm:text-[10px] max-sm:flex-wrap max-sm:gap-2">
                    <div className="flex gap-7 flex-wrap max-sm:gap-4">
                        {sectionNav.map((item) => (
                            <a
                                key={item.label}
                                href={`#${item.target}`}
                                onClick={(e) => handleSection(e, item.target)}
                                className="text-ink no-underline border-b border-transparent pb-0.5 transition-colors duration-200 hover:border-accent hover:text-accent cursor-pointer"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <a
                        href="#/dev-roadtrip"
                        onClick={(e) => {
                            e.preventDefault()
                            navigate('/dev-roadtrip')
                            window.scrollTo({ top: 0 })
                        }}
                        className="text-accent no-underline border-b border-accent pb-0.5 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                        The Creative Page <span className="opacity-70">&#x2197;</span>
                    </a>
                </nav>
            )}

            {variant === 'minimal' && (
                <div className="pt-3.5 font-mono text-[11px] tracking-[0.18em] uppercase">
                    <a
                        href="#/"
                        onClick={(e) => handleSection(e, 'top')}
                        className="text-ink no-underline border-b border-transparent pb-0.5 hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer"
                    >
                        &#x2190; Back to Portfolio
                    </a>
                </div>
            )}
        </header>
    )
}
