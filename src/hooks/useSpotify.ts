import { useState, useEffect } from 'react'
import { apiFetch } from '../lib/api'

interface Artist {
    name: string
    image_url?: string
}

interface SpotifyData {
    artists: Artist[]
    last_updated_utc: string
}

export function useSpotify() {
    const [data, setData] = useState<SpotifyData | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                const result = await apiFetch<SpotifyData>(
                    '/spotify_stats.json',
                    { method: 'GET' }
                )
                setData(result)
            } catch {
                setError(true)
            }
        }
        load()
    }, [])

    return { data, error }
}
