import { useState, useEffect, useCallback } from 'react'

interface TypewriterProps {
    phrases: string[]
    startDelay?: number
}

export function Typewriter({ phrases, startDelay = 1500 }: TypewriterProps) {
    const [displayText, setDisplayText] = useState('')
    const [phraseIndex, setPhraseIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showCursor, setShowCursor] = useState(true)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), startDelay)
        return () => clearTimeout(timer)
    }, [startDelay])

    const tick = useCallback(() => {
        if (!started) return undefined

        const currentPhrase = phrases[phraseIndex]
        const isLastPhrase = phraseIndex === phrases.length - 1

        // Finished typing current phrase
        if (!isDeleting && displayText === currentPhrase) {
            if (isLastPhrase) {
                // Stop and hide cursor
                return setTimeout(() => setShowCursor(false), 500)
            }
            // Pause then delete
            return setTimeout(() => setIsDeleting(true), 1500)
        }

        // Finished deleting
        if (isDeleting && displayText === '') {
            setIsDeleting(false)
            setPhraseIndex((prev) => prev + 1)
            return setTimeout(() => {}, 300)
        }

        // Type or delete one character
        const speed = isDeleting
            ? Math.floor(Math.random() * 20) + 20
            : Math.floor(Math.random() * 40) + 40

        return setTimeout(() => {
            setDisplayText((prev) =>
                isDeleting
                    ? currentPhrase.substring(0, prev.length - 1)
                    : currentPhrase.substring(0, prev.length + 1)
            )
        }, speed)
    }, [started, displayText, phraseIndex, isDeleting, phrases])

    useEffect(() => {
        const timer = tick()
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [tick])

    return (
        <span className={showCursor ? 'typewriter-cursor' : ''}>
            {displayText}
        </span>
    )
}
