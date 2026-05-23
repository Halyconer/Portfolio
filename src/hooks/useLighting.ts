import { useState } from 'react'
import { apiFetch, ApiFetchError } from '../lib/api'
import type { BrightnessResponse } from '../types/lighting'

function statusForError(err: unknown): string {
    if (err instanceof ApiFetchError) {
        switch (err.detail.kind) {
            case 'network':
                return '× My personal high-tech self-built server is offline — please try again later'
            case 'http':
                if (err.detail.status === 404) {
                    return '× Light control endpoint not found — I messed up the code...'
                }
                if (err.detail.status >= 500) {
                    return '× Server error — my Raspberry Pi is probably overloaded'
                }
                return `× ${err.message}`
            case 'parse':
                return '× Got an unreadable response from the server'
        }
    }
    return `× ${err instanceof Error ? err.message : 'Unknown error'}`
}

export function useLighting() {
    const [brightness, setBrightness] = useState(75)
    const [status, setStatus] = useState('')
    const [isSending, setIsSending] = useState(false)

    const sendBrightness = async () => {
        setStatus(`Setting brightness to ${brightness}%...`)
        setIsSending(true)

        try {
            const data = await apiFetch<BrightnessResponse>(
                '/lighting/set_brightness',
                {
                    method: 'POST',
                    body: JSON.stringify({ brightness }),
                }
            )
            if (data.status === 'success') {
                setStatus(
                    `✓ Lights set to ${data.brightness_set}% — thanks for the greeting!`
                )
            } else {
                setStatus(`× ${data.error || 'Unknown error'}`)
            }
        } catch (err) {
            setStatus(statusForError(err))
        } finally {
            setIsSending(false)
        }
    }

    return { brightness, setBrightness, status, isSending, sendBrightness }
}
