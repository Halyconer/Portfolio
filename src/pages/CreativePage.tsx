import { useCallback, useMemo, useState } from 'react'

import { CreativeHero } from '../components/creative/CreativeHero'
import { FeaturedPlate } from '../components/creative/FeaturedPlate'
import { Lightbox } from '../components/creative/Lightbox'
import { PhotoSection } from '../components/creative/PhotoSection'
import {
    featuredPhoto,
    flattenAllPhotos,
    photoSections,
} from '../data/creativePhotos'

export function CreativePage() {
    const photos = useMemo(() => flattenAllPhotos(), [])
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleClose = useCallback(() => setActiveIndex(null), [])
    const handleNavigate = useCallback(
        (delta: number) => {
            setActiveIndex((curr) => {
                if (curr === null) return curr
                const total = photos.length
                return (curr + delta + total) % total
            })
        },
        [photos.length]
    )

    return (
        <>
            <CreativeHero />
            <FeaturedPlate
                photo={featuredPhoto}
                onClick={() => setActiveIndex(0)}
            />
            {/* Featured plate is flat index 0; each section's photos follow in
             * section order. */}
            {photoSections.map((section, i) => (
                <PhotoSection
                    key={section.id}
                    section={section}
                    startIndex={
                        1 +
                        photoSections
                            .slice(0, i)
                            .reduce((n, s) => n + s.photos.length, 0)
                    }
                    onPhotoClick={setActiveIndex}
                />
            ))}
            <Lightbox
                photos={photos}
                activeIndex={activeIndex}
                onClose={handleClose}
                onNavigate={handleNavigate}
            />
        </>
    )
}
