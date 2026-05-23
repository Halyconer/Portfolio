interface SectionEyebrowProps {
    numeral: string
    label: string
    /** Optional override for spacing/etc (e.g. "mb-5"). */
    className?: string
}

export function SectionEyebrow({
    numeral,
    label,
    className = '',
}: SectionEyebrowProps) {
    return (
        <div
            className={`font-mono text-[11px] tracking-[0.22em] uppercase text-muted ${className}`}
        >
            &sect; {numeral} &mdash; {label}
        </div>
    )
}
