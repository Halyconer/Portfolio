import type { PhotoSectionData } from '../../data/creativePhotos'
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
        <section
            id={section.id}
            className="px-8 pt-10 max-md:px-5 max-sm:px-4 [&+&]:pt-7"
        >
            <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-baseline pb-2.5 mb-3.5 border-b border-rule-strong max-md:grid-cols-1 max-md:gap-1.5">
                <div className="font-mono text-[11px] tracking-[0.24em] text-muted">
                    {section.numeral}
                </div>
                <h2 className="font-serif font-normal text-[clamp(20px,2vw,26px)] leading-tight tracking-[-0.005em] m-0">
                    {section.title}
                    <span
                        className="italic text-accent"
                        style={{
                            fontVariationSettings: '"opsz" 36, "ital" 1',
                        }}
                    >
                        {section.titleItalic}
                    </span>
                </h2>
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted text-right leading-relaxed max-md:text-left">
                    <b className="block text-ink font-medium">{section.meta}</b>
                    {section.submeta}
                </div>
            </div>

            {/* CSS multi-column layout — photos flow vertically through 1/2/3
             * columns and pack tight (no dead rows like a CSS grid would
             * create when tiles have mismatched aspect ratios). gap-3 sets the
             * column-gap; per-tile mb-3 supplies the vertical gap inside a
             * column. break-inside-avoid on each tile prevents column splits. */}
            <div className="columns-1 sm:columns-2 md:columns-3 gap-3">
                {section.photos.map((photo, i) => (
                    <PhotoTile
                        key={photo.id}
                        photo={photo}
                        onClick={() => onPhotoClick(startIndex + i)}
                    />
                ))}
            </div>
        </section>
    )
}
