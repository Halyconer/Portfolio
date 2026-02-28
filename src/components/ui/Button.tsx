import type { ComponentProps } from 'react'

const base =
    'inline-flex items-center justify-center py-3.5 px-7 rounded-md font-medium text-[0.9rem] transition-all duration-250 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.1)] no-underline border-[1.5px]'

const variants = {
    primary:
        'border-transparent bg-gradient-to-br from-primary to-primary-light text-white hover:from-primary-dark hover:to-primary hover:-translate-y-px hover:shadow-[0_4px_15px_rgba(74,144,226,0.25)] hover:border-primary-deep disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
        'border-border bg-white text-slate-dark hover:bg-[#f8f9fa] hover:border-primary hover:text-primary hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(74,144,226,0.15)]',
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
