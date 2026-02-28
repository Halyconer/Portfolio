import { useState, useEffect } from 'react'
import { apiFetch } from '../lib/api'

interface Stats {
    total_calls_all_time: number
    avg_brightness_all_time: number
}

export function useStats() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await apiFetch<Stats>('/stats.json', {
                    method: 'GET',
                })
                setStats(data)
            } catch {
                setError(true)
            }
        }
        load()
    }, [])

    return { stats, error }
}
