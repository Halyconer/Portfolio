import { useCallback, useMemo, useState } from 'react'
import { CreativeHero } from '../components/creative/CreativeHero'
import { FeaturedPlate } from '../components/creative/FeaturedPlate'
import { PhotoSection } from '../components/creative/PhotoSection'
import { Lightbox } from '../components/creative/Lightbox'
import { CreativeFooter } from '../components/creative/CreativeFooter'
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

    // Featured plate is index 0; section photos start at index 1 and run in
    // section order. Pre-compute each section's start index.
    let runningIndex = 1
    const sectionStartIndices = photoSections.map((s) => {
        const start = runningIndex
        runningIndex += s.photos.length
        return start
    })

    return (
        <>
            <CreativeHero />
            <FeaturedPlate
                photo={featuredPhoto}
                onClick={() => setActiveIndex(0)}
            />
            {photoSections.map((section, i) => (
                <PhotoSection
                    key={section.id}
                    section={section}
                    startIndex={sectionStartIndices[i]}
                    onPhotoClick={setActiveIndex}
                />
            ))}
            <CreativeFooter />
            <Lightbox
                photos={photos}
                activeIndex={activeIndex}
                onClose={handleClose}
                onNavigate={handleNavigate}
            />
        </>
    )
}
