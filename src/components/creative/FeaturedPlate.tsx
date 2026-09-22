import type { Photo } from '../../data/creativePhotos'
import { Section } from '../ui/Section'

interface FeaturedPlateProps {
    photo: Photo
    onClick: () => void
}

export function FeaturedPlate({ photo, onClick }: FeaturedPlateProps) {
    return (
        <Section divided={false} spacing="none" className="pt-5">
            <button
                type="button"
                onClick={onClick}
                className="block w-full p-0 m-0 border-0 bg-placeholder cursor-zoom-in overflow-hidden aspect-[16/9]"
                aria-label={`Open ${photo.label}`}
            >
                {photo.src ? (
                    <img
                        // Featured plate is the LCP: eager + high priority.
                        // srcSet lets small viewports take the 960 file.
                        src={photo.fullSrc ?? photo.src}
                        srcSet={
                            photo.fullSrc && photo.src
                                ? `${photo.src} 960w, ${photo.fullSrc} 2560w`
                                : undefined
                        }
                        sizes="100vw"
                        alt={photo.alt ?? photo.label}
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover block"
                    />
                ) : (
                    <div className="photo-placeholder w-full h-full flex items-center justify-center text-label text-center px-3">
                        {photo.label}
                    </div>
                )}
            </button>
            <div className="grid grid-cols-2 gap-6 mt-3.5 text-eyebrow max-sm:grid-cols-1 max-sm:gap-1">
                <span>
                    <b className="text-ink font-medium">Plate 01</b>{' '}
                    &nbsp;·&nbsp; Blue-and-gold macaw
                </span>
                <span className="text-right max-sm:text-left">
                    Nikon D750 &nbsp;·&nbsp; 80-200mm &nbsp;·&nbsp; ƒ/4 · 1/500
                </span>
            </div>
        </Section>
    )
}
