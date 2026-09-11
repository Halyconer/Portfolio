import { useState } from 'react'

import { apiFetch, ApiFetchError } from '../lib/api'
import type { BrightnessResponse, ColorResponse } from '../types/lighting'

function statusForError(err: unknown): string {
    if (err instanceof ApiFetchError) {
        const d = err.detail
        if (d.kind === 'network')
            return '× My personal high-tech self-built server is offline — please try again later'
        if (d.kind === 'parse')
            return '× Got an unreadable response from the server'
        if (d.kind === 'http') {
            if (d.status === 404)
                return '× Light control endpoint not found — I messed up the code...'
            if (d.status >= 500)
                return '× Server error — my Raspberry Pi is probably overloaded'
        }
        return `× ${err.message}`
    }
    return `× ${err instanceof Error ? err.message : 'Unknown error'}`
}

// Saturation is fixed at full — lower LIFX saturation just washes toward white.
const FIXED_SATURATION = 100

export function useLighting() {
    const [brightness, setBrightness] = useState(75)
    // Warm orange (~30°) default matches the editorial accent.
    const [hue, setHue] = useState(30)
    const [status, setStatus] = useState('')
    const [isSending, setIsSending] = useState(false)

    async function send<T extends { status: string; error?: string }>(
        endpoint: string,
        body: object,
        pending: string,
        ok: (data: T) => string
    ) {
        setStatus(pending)
        setIsSending(true)
        try {
            const data = await apiFetch<T>(endpoint, {
                method: 'POST',
                body: JSON.stringify(body),
            })
            setStatus(
                data.status === 'success'
                    ? ok(data)
                    : `× ${data.error || 'Unknown error'}`
            )
        } catch (err) {
            setStatus(statusForError(err))
        } finally {
            setIsSending(false)
        }
    }

    const sendBrightness = () =>
        send<BrightnessResponse>(
            '/lighting/set_brightness',
            { brightness },
            `Setting brightness to ${brightness}%...`,
            (d) =>
                `✓ Lights set to ${d.brightness_set}% — thanks for the greeting!`
        )

    const sendColor = () =>
        send<ColorResponse>(
            '/lighting/set_color',
            { hue, saturation: FIXED_SATURATION },
            `Setting color to hue=${Math.round(hue)}°...`,
            (d) => `✓ Color set to hue=${d.hue_set}°`
        )

    return {
        brightness,
        setBrightness,
        hue,
        setHue,
        saturation: FIXED_SATURATION,
        status,
        isSending,
        sendBrightness,
        sendColor,
    }
}
