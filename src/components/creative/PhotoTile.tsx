import type { Photo } from '../../data/creativePhotos'

interface PhotoTileProps {
    photo: Photo
    onClick: () => void
}

export function PhotoTile({ photo, onClick }: PhotoTileProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`Open ${photo.label}`}
            className="group relative block w-full mb-3 break-inside-avoid overflow-hidden bg-placeholder cursor-zoom-in p-0 border-0 hover:opacity-85 transition-opacity duration-200"
        >
            {photo.src ? (
                <img
                    src={photo.src}
                    alt={photo.alt ?? photo.label}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block"
                />
            ) : (
                <div className="photo-placeholder aspect-square flex items-center justify-center text-center px-3 font-mono text-[10.5px] tracking-[0.22em] uppercase text-muted-hi">
                    {photo.label}
                </div>
            )}
        </button>
    )
}
