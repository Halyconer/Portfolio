import { useState, useEffect } from 'react'
import { apiFetch, isAbortError } from '../lib/api'
import type { StatusTone } from '../types/status'

// One-shot GET with abort-on-unmount. `tone` maps the lifecycle to a
// StatusTone so consumers can render <StatusDot> without re-deriving state.
export function useApiResource<T>(endpoint: string) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        // Reset on endpoint change so stale data doesn't flash in.
        setData(null)
        setError(false)

        const ctrl = new AbortController()
        apiFetch<T>(endpoint, { method: 'GET', signal: ctrl.signal })
            .then(setData)
            .catch((err) => {
                if (!isAbortError(err)) setError(true)
            })
        return () => ctrl.abort()
    }, [endpoint])

    const tone: StatusTone = data ? 'online' : error ? 'offline' : 'probing'
    return { data, error, tone }
}
