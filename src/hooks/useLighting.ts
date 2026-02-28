import { useState } from 'react'
import { apiFetch } from '../lib/api'
import type { BrightnessResponse } from '../types/lighting'

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
                    `\u2713 Lights set to ${data.brightness_set}% \u2014 thanks for the greeting!`
                )
            } else {
                setStatus(`\u00d7 ${data.error || 'Unknown error'}`)
            }
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Unknown error'
            if (
                message.includes('Failed to fetch') ||
                message.includes('NetworkError')
            ) {
                setStatus(
                    '\u00d7 My personal high-tech self-built server is offline - please try again later'
                )
            } else if (message.includes('404')) {
                setStatus(
                    '\u00d7 Light control endpoint not found - I messed up the code...'
                )
            } else if (message.includes('500')) {
                setStatus(
                    '\u00d7 Server error - my raspberry pi is probably overloaded'
                )
            } else {
                setStatus(`\u00d7 Connection failed: ${message}`)
            }
        } finally {
            setIsSending(false)
        }
    }

    return { brightness, setBrightness, status, isSending, sendBrightness }
}
