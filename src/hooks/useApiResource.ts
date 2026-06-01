import { useState, useEffect } from 'react'
import { apiFetch, isAbortError } from '../lib/api'
import type { StatusTone } from '../types/status'

/**
 * One-shot GET against the Pi backend, with abort-on-unmount.
 * `data` is null until the response arrives; `error` is true for any
 * non-abort failure; `tone` maps the request lifecycle to a StatusTone
 * so consumers can render <StatusDot> without re-deriving the state.
 */
export function useApiResource<T>(endpoint: string) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        // Reset on endpoint change so stale data from a previous endpoint
        // doesn't flash before the new response lands.
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
