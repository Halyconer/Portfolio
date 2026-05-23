import { API_BASE_URL } from './constants'

/**
 * Typed API error. Callers can branch on `kind` instead of grepping
 * substrings from messages — message text varies per browser/locale.
 */
export type ApiError =
    | { kind: 'network'; cause: unknown }
    | { kind: 'http'; status: number; statusText: string; body: unknown }
    | { kind: 'parse'; cause: unknown }

export class ApiFetchError extends Error {
    detail: ApiError
    constructor(detail: ApiError) {
        super(
            detail.kind === 'http'
                ? `HTTP ${detail.status} ${detail.statusText}`
                : detail.kind === 'network'
                  ? 'Network error'
                  : 'Response parse error'
        )
        this.name = 'ApiFetchError'
        this.detail = detail
    }
}

async function safeParse(res: Response): Promise<unknown> {
    const ct = res.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) {
        const text = await res.text().catch(() => '')
        return text || null
    }
    try {
        return await res.json()
    } catch (cause) {
        throw new ApiFetchError({ kind: 'parse', cause })
    }
}

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    let res: Response
    try {
        res = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                ...options?.headers,
            },
        })
    } catch (cause) {
        throw new ApiFetchError({ kind: 'network', cause })
    }

    if (!res.ok) {
        const body = await safeParse(res).catch(() => null)
        throw new ApiFetchError({
            kind: 'http',
            status: res.status,
            statusText: res.statusText,
            body,
        })
    }

    return (await safeParse(res)) as T
}
