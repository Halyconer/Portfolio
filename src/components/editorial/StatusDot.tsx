import type { ReactNode } from 'react'

interface StatusDotProps {
    children: ReactNode
}

// Pulsing green status pip — used wherever something is "live" or "online".
// Kept as inline-flex so it sits naturally next to text in flex rows or
// inside typography containers without extra wrappers at the call site.
export function StatusDot({ children }: StatusDotProps) {
    return (
        <span className="inline-flex items-center gap-2.5">
            <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full bg-status-online shadow-[0_0_8px_var(--color-status-online)]"
            />
            {children}
        </span>
    )
}
