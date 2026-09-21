import type { ReactNode } from 'react'

interface SectionProps {
    id?: string
    children: ReactNode
    /** Hairline rule above the section (the page-band separator). */
    divided?: boolean
    /** Warm paper band instead of plain paper. */
    warm?: boolean
    /** Vertical rhythm: page sections, roomy case-study sections, or
     * caller-managed (use className for one-off spacing). */
    spacing?: 'base' | 'roomy' | 'none'
    className?: string
}

const SPACING = {
    base: 'py-10 max-md:py-8 max-sm:py-6',
    roomy: 'py-20 max-md:py-12 max-sm:py-10',
    none: '',
} as const

/**
 * Page band. Owns the horizontal page padding, optional hairline separator
 * and warm-paper tint so every section lines up without repeating
 * `px-8 py-10 max-md:…` utility strings. See DESIGN.md.
 */
export function Section({
    id,
    children,
    divided = true,
    warm = false,
    spacing = 'base',
    className,
}: SectionProps) {
    return (
        <section
            id={id}
            className={[
                'px-8 max-md:px-5 max-sm:px-4',
                SPACING[spacing],
                divided && 'border-t border-rule-strong',
                warm && 'bg-paper-warm',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {children}
        </section>
    )
}
