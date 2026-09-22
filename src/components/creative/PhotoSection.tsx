import type { PhotoSectionData } from '../../data/creativePhotos'
import { Section } from '../ui/Section'
import { PhotoTile } from './PhotoTile'

interface PhotoSectionProps {
    section: PhotoSectionData
    /** Index in the flat photos array where this section's first photo lives. */
    startIndex: number
    onPhotoClick: (flatIndex: number) => void
}

export function PhotoSection({
    section,
    startIndex,
    onPhotoClick,
}: PhotoSectionProps) {
    return (
        <Section
            id={section.id}
            divided={false}
            spacing="none"
            className="pt-10 [&+&]:pt-7"
        >
            <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-baseline pb-2.5 mb-3.5 border-b border-rule-strong max-md:grid-cols-1 max-md:gap-1.5">
                <div className="text-eyebrow tracking-[0.24em]">
                    {section.numeral}
                </div>
                <h2 className="font-serif font-normal text-[clamp(20px,2vw,26px)] leading-tight tracking-[-0.005em] m-0">
                    {section.title}
                    <span className="italic text-accent">
                        {section.titleItalic}
                    </span>
                </h2>
                <div className="text-label text-right leading-relaxed max-md:text-left">
                    <b className="block text-ink font-medium">{section.meta}</b>
                    {section.submeta}
                </div>
            </div>

            {/* CSS multi-column layout — photos flow vertically through 1/2/3
             * columns and pack tight (unlike a grid, which leaves dead rows on
             * mismatched aspect ratios). break-inside-avoid prevents splits. */}
            <div className="columns-1 sm:columns-2 md:columns-3 gap-3">
                {section.photos.map((photo, i) => (
                    <PhotoTile
                        key={photo.id}
                        photo={photo}
                        onClick={() => onPhotoClick(startIndex + i)}
                    />
                ))}
            </div>
        </Section>
    )
}
