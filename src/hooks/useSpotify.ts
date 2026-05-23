import { useState, useEffect } from 'react'
import { apiFetch, isAbortError } from '../lib/api'

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
        const ctrl = new AbortController()
        apiFetch<SpotifyData>('/spotify_stats.json', {
            method: 'GET',
            signal: ctrl.signal,
        })
            .then(setData)
            .catch((err) => {
                if (!isAbortError(err)) setError(true)
            })
        return () => ctrl.abort()
    }, [])

    return { data, error }
}
