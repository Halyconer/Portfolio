import { useState, useEffect } from 'react'
import { apiFetch, isAbortError } from '../lib/api'

/**
 * One-shot GET against the Pi backend, with abort-on-unmount.
 * Returns `{ data, error }`: data is null until the response arrives,
 * error is `true` for any non-abort failure.
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

    return { data, error }
}
