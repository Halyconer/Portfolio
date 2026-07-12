import { API_BASE_URL } from './constants'

/**
 * Typed API error. Callers can branch on `kind` instead of grepping
 * substrings from messages — message text varies per browser/locale.
 */
export type ApiError =
    | { kind: 'network'; cause: unknown }
    | { kind: 'http'; status: number; statusText: string; body: unknown }
    | { kind: 'parse'; cause: unknown }
    | { kind: 'aborted' }

export class ApiFetchError extends Error {
    detail: ApiError
    constructor(detail: ApiError) {
        super(
            detail.kind === 'http'
                ? `HTTP ${detail.status} ${detail.statusText}`
                : detail.kind === 'network'
                  ? 'Network error'
                  : detail.kind === 'aborted'
                    ? 'Request aborted'
                    : 'Response parse error'
        )
        this.name = 'ApiFetchError'
        this.detail = detail
    }
}

export function isAbortError(err: unknown): boolean {
    return err instanceof ApiFetchError && err.detail.kind === 'aborted'
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
        // Only declare a Content-Type when there's a body to describe. Adding
        // it to GETs makes them "non-simple" in CORS terms, which forces a
        // preflight round-trip on every fetch for no benefit.
        res = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...(options?.body != null
                    ? { 'Content-Type': 'application/json' }
                    : {}),
                ...options?.headers,
            },
        })
    } catch (cause) {
        // AbortError is the standard DOMException name for fetch cancellation.
        if (cause instanceof DOMException && cause.name === 'AbortError') {
            throw new ApiFetchError({ kind: 'aborted' })
        }
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
