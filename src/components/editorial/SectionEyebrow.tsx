export function SectionEyebrow({
    numeral,
    label,
}: {
    numeral: string
    label: string
}) {
    return (
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted mb-3">
            &sect; {numeral} &mdash; {label}
        </div>
    )
}
