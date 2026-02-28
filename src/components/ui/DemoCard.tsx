import type { ComponentProps } from 'react'

const cardClass =
    'demo-card-touch bg-white rounded-md py-3 px-4 pb-2 shadow-[0_3px_15px_rgba(0,0,0,0.12)] text-center transition-all duration-300 border border-border cursor-pointer hover:border-primary hover:shadow-[0_6px_25px_rgba(74,144,226,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_12px_rgba(74,144,226,0.15)]'

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
