import type { ReactNode } from 'react'

interface MetaFieldProps {
    label: string
    children: ReactNode
    /**
     * `card` — TLDR-style grid cell: rule under the label, serif-display
     * value. `inline` — sidebar-style: tight label, sans body value.
     */
    variant?: 'card' | 'inline'
}

export function MetaField({
    label,
    children,
    variant = 'card',
}: MetaFieldProps) {
    const labelClass =
        variant === 'card'
            ? 'font-mono text-[10px] tracking-[0.18em] uppercase text-muted mb-2.5 pb-2 border-b border-rule'
            : 'font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-1'

    const valueClass =
        variant === 'card'
            ? 'font-serif font-light text-[1.25rem] leading-[1.25] tracking-[-0.005em] text-ink max-sm:text-[1.1rem]'
            : 'font-sans text-[0.95rem] leading-[1.5] text-ink-soft'

    return (
        <div>
            <div className={labelClass}>{label}</div>
            <div className={valueClass}>{children}</div>
        </div>
    )
}
