import { Link } from 'react-router-dom'

export function CreativeFooter() {
    return (
        <footer
            className="mt-14 px-8 pt-6 pb-8 grid grid-cols-3 gap-6 font-mono text-[11px] tracking-[0.16em] uppercase text-muted max-md:grid-cols-1 max-md:gap-3.5 max-md:px-5 max-sm:px-4"
            style={{ borderTop: '1px solid var(--color-rule-strong)' }}
        >
            <div>
                &copy; 2026 Adrian Eddy &nbsp;·&nbsp;{' '}
                <a
                    href="mailto:ae2422@nyu.edu"
                    className="text-ink no-underline border-b border-transparent pb-px hover:border-accent transition-colors"
                >
                    ae2422@nyu.edu
                </a>
            </div>
            <div className="text-center max-md:text-left">
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink no-underline border-b border-transparent pb-px hover:border-accent transition-colors"
                >
                    Instagram
                </a>
                &nbsp;·&nbsp;
                <Link
                    to="/"
                    className="text-ink no-underline border-b border-transparent pb-px hover:border-accent transition-colors"
                >
                    Portfolio
                </Link>
            </div>
            <div className="text-right max-md:text-left">
                Frames shot on Canon &nbsp;·&nbsp; NYC
            </div>
        </footer>
    )
}
