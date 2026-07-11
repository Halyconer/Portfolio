export function Colophon() {
    return (
        <footer className="px-8 pt-8 pb-10 relative border-t border-rule-strong max-md:px-5 max-md:pt-6 max-md:pb-8 max-sm:px-4">
            <div className="flex justify-between items-end gap-6 flex-wrap max-md:items-start max-md:flex-col">
                <div></div>
                <div className="text-xs text-muted text-right leading-[2] max-md:text-left">
                    <a
                        href="https://github.com/Halyconer"
                        target="_blank"
                        rel="noopener"
                        className="text-muted hover:text-accent transition-colors no-underline"
                    >
                        GitHub
                    </a>
                    {' · '}
                    &copy; 2026 Adrian Eddy &middot; New York
                </div>
            </div>
        </footer>
    )
}
