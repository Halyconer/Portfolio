import type { ComponentProps } from 'react'

// Editorial pass:
//   - Removed the stacked shadows (`shadow-[0_3px_15px_rgba(0,0,0,0.12)]`
//     base and `hover:shadow-[0_6px_25px_rgba(74,144,226,0.2)]`).
//   - Removed `hover:-translate-y-0.5` and the active translate.
//   - `transition-all duration-300` -> `transition-colors duration-200`.
//   - `rounded-md` -> `rounded-sm` for crisper corners.
// What remains: a card with a hairline border that darkens on hover. Calm.

const cardClass =
    'demo-card-touch bg-bg-page py-6 px-7 text-left transition-colors duration-200 border border-border cursor-pointer hover:bg-bg-light'

export function DemoCard({
    className = '',
    ...props
}: ComponentProps<'div'>) {
    return <div className={`${cardClass} ${className}`} {...props} />
}

export function DemoCardLink({
    className = '',
    ...props
}: ComponentProps<'a'>) {
    return (
        <a
            className={`${cardClass} no-underline text-inherit block ${className}`}
            {...props}
        />
    )
}
