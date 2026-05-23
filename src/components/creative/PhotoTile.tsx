import type { Photo } from '../../data/creativePhotos'

interface PhotoTileProps {
    photo: Photo
    onClick: () => void
}

const ASPECT_CLASS: Record<Photo['aspect'], string> = {
    '5/4': 'aspect-[5/4]',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
    '2/3': 'aspect-[2/3]',
    '16/9': 'aspect-video',
    '21/9': 'aspect-[21/9]',
    '3/4': 'aspect-[3/4]',
}

const SPAN_CLASS: Record<Photo['span'], string> = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
}

export function PhotoTile({ photo, onClick }: PhotoTileProps) {
    const aspect = ASPECT_CLASS[photo.aspect]
    const span = SPAN_CLASS[photo.span]

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`Open ${photo.label}`}
            className={`group relative col-span-6 ${span} ${aspect} overflow-hidden bg-placeholder cursor-zoom-in p-0 m-0 border-0 hover:opacity-85 transition-opacity duration-200`}
        >
            {photo.src ? (
                <img
                    src={photo.src}
                    alt={photo.alt ?? photo.label}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover block"
                />
            ) : (
                <div className="photo-placeholder absolute inset-0 flex items-center justify-center text-center px-3 font-mono text-[10.5px] tracking-[0.22em] uppercase text-muted-hi">
                    {photo.label}
                </div>
            )}
        </button>
    )
}
