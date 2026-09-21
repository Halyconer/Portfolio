import type { ReactNode } from 'react'

interface CardProps {
    title: string
    /** Right-aligned slot on the title baseline (StatusDot, state label…). */
    aside?: ReactNode
    /** Small status line rendered directly above the action row. */
    status?: ReactNode
    /** Full-bleed hairline action row pinned to the card bottom. Actions
     * should use the `card-action` class. */
    actions?: ReactNode
    children: ReactNode
}

/**
 * Interactive demo card: bordered warm-paper frame with a title row, free
 * content, and an optional full-bleed action footer. See DESIGN.md.
 */
export function Card({ title, aside, status, actions, children }: CardProps) {
    return (
        <div className="relative flex flex-col border border-rule bg-paper-warm p-8 max-sm:p-5">
            <div className="flex justify-between items-baseline gap-3 mb-4">
                <h3 className="font-serif font-light text-heading m-0 text-ink">
                    {title}
                </h3>
                {aside}
            </div>

            {children}

            {actions && (
                <div className="mt-auto pt-4">
                    {status !== undefined && (
                        <p
                            role="status"
                            aria-live="polite"
                            className="mb-3 min-h-5 text-right text-xs leading-5 text-muted"
                        >
                            {status}
                        </p>
                    )}
                    <div className="-mx-8 -mb-8 flex border-t border-rule max-sm:-mx-5 max-sm:-mb-5">
                        {actions}
                    </div>
                </div>
            )}
        </div>
    )
}
