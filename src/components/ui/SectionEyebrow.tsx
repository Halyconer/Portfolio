/**
 * Numbered section marker for long-form pages: "§ 01 — The trip so far".
 * See DESIGN.md.
 */
export function SectionEyebrow({
    numeral,
    label,
}: {
    numeral: string
    label: string
}) {
    return (
        <div className="text-eyebrow tracking-[0.22em] mb-3">
            &sect; {numeral} &mdash; {label}
        </div>
    )
}
