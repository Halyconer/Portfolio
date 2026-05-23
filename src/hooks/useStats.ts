import { useState, useEffect } from 'react'
import { apiFetch, isAbortError } from '../lib/api'

interface Stats {
    total_calls_all_time: number
    avg_brightness_all_time: number
}

export function useStats() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const ctrl = new AbortController()
        apiFetch<Stats>('/stats.json', {
            method: 'GET',
            signal: ctrl.signal,
        })
            .then(setStats)
            .catch((err) => {
                if (!isAbortError(err)) setError(true)
            })
        return () => ctrl.abort()
    }, [])

    return { stats, error }
}
