import type { ReactNode } from 'react'

interface SectionHeadingProps {
    children: ReactNode
    /** Hairline rule below the heading. */
    rule?: boolean
    /** Right-aligned slot on the heading baseline (status, timestamp…). */
    aside?: ReactNode
    className?: string
}

/**
 * Standard section title: serif light heading with an optional hairline,
 * optionally paired with a right-aligned aside. See DESIGN.md.
 */
export function SectionHeading({
    children,
    rule = true,
    aside,
    className,
}: SectionHeadingProps) {
    return (
        <div className={className}>
            <div className="flex justify-between items-baseline gap-6">
                <h2 className="font-serif font-light text-heading m-0 text-ink">
                    {children}
                </h2>
                {aside}
            </div>
            {rule && <div className="h-px bg-rule-strong mt-4" />}
        </div>
    )
}
