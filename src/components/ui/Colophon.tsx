/**
 * The site colophon — one footer on every route, closing the page with
 * contact and credits. Top padding matches a section's so content above
 * never touches the rule (gallery sections have no bottom padding of their
 * own). See DESIGN.md.
 */
export function Colophon() {
    return (
        <footer className="px-8 pt-10 pb-10 border-t border-rule-strong max-md:px-5 max-md:pt-8 max-md:pb-8 max-sm:px-4 max-sm:pt-6">
            <div className="flex justify-between items-end gap-6 flex-wrap max-md:items-start max-md:flex-col">
                <a
                    href="mailto:business@adrianeddy.com"
                    className="link-quiet text-eyebrow"
                >
                    business@adrianeddy.com
                </a>
                <div className="text-xs text-muted leading-[2]">
                    <a
                        href="https://github.com/Halyconer"
                        target="_blank"
                        rel="noopener"
                        className="link-quiet"
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
