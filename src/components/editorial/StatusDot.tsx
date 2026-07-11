import type { ReactNode } from 'react'
import type { StatusTone } from '../../types/status'

interface StatusDotProps {
    children?: ReactNode
    tone?: StatusTone
}

const DOT_STYLE: Record<StatusTone, string> = {
    online:
        'bg-status-online shadow-[0_0_8px_var(--color-status-online)]',
    offline:
        'bg-[var(--color-accent-deep)] shadow-[0_0_8px_var(--color-accent-deep)]',
    probing:
        'bg-[var(--color-muted-hi)] shadow-[0_0_6px_var(--color-muted-hi)] animate-pulse',
}

// Status pip — used wherever something is "live", "offline", or being probed.
// Inline-flex so it sits naturally next to text without extra wrappers.
export function StatusDot({ children, tone = 'online' }: StatusDotProps) {
    return (
        <span className="inline-flex items-center gap-2.5">
            <span
                aria-hidden="true"
                className={`inline-block w-2 h-2 rounded-full ${DOT_STYLE[tone]}`}
            />
            {children}
        </span>
    )
}
