/**
 * Shape of /reading.json — generated on the Pi by
 * backend/generate_reading_stats.py from the Hardcover API.
 */
export interface ReadingBook {
    title: string
    author: string
}

export interface RecentRead extends ReadingBook {
    /** 0–5 in half-star steps, or null if the book wasn't rated. */
    rating: number | null
}

export interface ReadingStats {
    generated_at: string
    username: string | null
    currently_reading: ReadingBook[]
    recent_reads: RecentRead[]
}
