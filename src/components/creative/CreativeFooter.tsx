export function CreativeFooter() {
    return (
        <footer
            className="mt-14 px-8 pt-6 pb-8 grid grid-cols-3 gap-6 font-mono text-[11px] tracking-[0.16em] uppercase text-muted max-md:grid-cols-1 max-md:gap-3.5 max-md:px-5 max-sm:px-4"
            style={{ borderTop: '1px solid var(--color-rule-strong)' }}
        >
            <div>
                &copy; 2026 Adrian Eddy &nbsp;·&nbsp;{' '}
                <a
                    href="mailto:business@adrianeddy.com"
                    className="text-ink no-underline border-b border-transparent pb-px hover:border-accent transition-colors"
                >
                    business@adrianeddy.com
                </a>
            </div>

            <div className="text-right max-md:text-left col-span-2 justify-self-end max-md:justify-self-start max-md:col-span-1">
                Frames shot on Nikon and Sony Cameras
            </div>
        </footer>
    )
}
