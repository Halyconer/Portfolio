import { useEffect } from 'react'
import type { Photo } from '../../data/creativePhotos'

interface LightboxProps {
    photos: Array<Photo & { sectionLabel: string }>
    activeIndex: number | null
    onClose: () => void
    onNavigate: (delta: number) => void
}

export function Lightbox({
    photos,
    activeIndex,
    onClose,
    onNavigate,
}: LightboxProps) {
    const isOpen = activeIndex !== null

    // Keyboard nav + body scroll lock are tied to the open state. The cleanup
    // returned from useEffect runs when the dep changes or the component
    // unmounts — that's what restores scroll and removes the listener.
    useEffect(() => {
        if (!isOpen) return

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            else if (e.key === 'ArrowLeft') onNavigate(-1)
            else if (e.key === 'ArrowRight') onNavigate(1)
        }
        document.addEventListener('keydown', handleKey)

        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = prevOverflow
        }
    }, [isOpen, onClose, onNavigate])

    if (!isOpen) return null

    const photo = photos[activeIndex]
    const total = photos.length

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={photo.label}
            className="fixed inset-0 z-[100] flex flex-col bg-paper/[0.985] backdrop-blur-[2px]"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div className="flex justify-between items-center px-7 py-5 text-eyebrow">
                <div>
                    <span className="text-ink">
                        {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    {' / '}
                    <span>{String(total).padStart(2, '0')}</span>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="btn-reset text-eyebrow text-ink pb-1.5 border-b border-ink hover:text-accent hover:border-accent transition-colors duration-200"
                >
                    Close ⎋
                </button>
            </div>

            <div
                className="flex-1 flex items-center justify-center relative px-20 max-md:px-3"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose()
                }}
            >
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        onNavigate(-1)
                    }}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer font-serif font-light text-ink py-4 px-6 opacity-40 hover:opacity-100 transition-opacity text-5xl max-md:text-3xl max-md:px-3 max-md:py-2"
                >
                    ‹
                </button>

                {photo.src ? (
                    <img
                        src={photo.src}
                        alt={photo.alt ?? photo.label}
                        decoding="async"
                        className="max-w-full max-h-full object-contain block bg-placeholder"
                    />
                ) : (
                    <div className="photo-placeholder-lg w-[min(78vw,1100px)] aspect-[5/4] flex items-center justify-center font-mono text-xs tracking-[0.22em] uppercase text-muted-hi text-center px-4">
                        {photo.label}
                    </div>
                )}

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        onNavigate(1)
                    }}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer font-serif font-light text-ink py-4 px-6 opacity-40 hover:opacity-100 transition-opacity text-5xl max-md:text-3xl max-md:px-3 max-md:py-2"
                >
                    ›
                </button>
            </div>

            <div className="text-center px-7 pt-5 pb-7 text-eyebrow">
                <b className="text-ink font-medium">{photo.sectionLabel}</b>{' '}
                &nbsp;·&nbsp; <span>{photo.label}</span>
            </div>
        </div>
    )
}
