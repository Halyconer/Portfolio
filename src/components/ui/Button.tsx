import type { ComponentProps } from 'react'

// Editorial pass:
//   - Removed the `bg-gradient-to-br from-primary to-primary-light` on the
//     primary variant. Solid color reads as confident; gradient reads as
//     "I want this button to look exciting."
//   - Removed `hover:-translate-y-px` and all the shadow-on-hover stacks.
//     Editorial buttons don't bounce. Hover state is purely a color shift.
//   - `transition-all duration-250` -> `transition-colors duration-200`.
//     We're only animating color now, so a more specific transition keeps
//     things calm and avoids any layout-affecting animation.
//   - `border-[1.5px]` -> `border` (1px). 1px borders are more refined.
//   - Secondary variant simplified: outline button that inverts on hover
//     (dark border + ink text -> filled ink + white text). Classic editorial
//     pattern that gives a confident interaction without lifting or glowing.

const base =
    'inline-flex items-center justify-center py-2.5 px-5 rounded-sm font-medium text-[0.95rem] transition-colors duration-200 cursor-pointer no-underline border'

// Inverted CTA on dark mode: white surface, dark text. Secondary is the
// outline that fills with white on hover (text flips to the page bg color
// so it stays legible inside the filled state).
const variants = {
    primary:
        'border-primary bg-primary text-bg-page hover:bg-primary-dark hover:border-primary-dark disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
        'border-ink bg-transparent text-ink hover:bg-ink hover:text-bg-page',
} as const

type Variant = keyof typeof variants

interface ButtonProps extends ComponentProps<'button'> {
    variant?: Variant
}

interface LinkButtonProps extends ComponentProps<'a'> {
    variant?: Variant
}

export function Button({
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        />
    )
}

export function LinkButton({
    variant = 'secondary',
    className = '',
    ...props
}: LinkButtonProps) {
    return (
        <a className={`${base} ${variants[variant]} ${className}`} {...props} />
    )
}
