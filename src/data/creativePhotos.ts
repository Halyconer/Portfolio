export type AspectRatio = '5/4' | '1/1' | '3/2' | '2/3' | '16/9'

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6

export interface Photo {
    id: string
    label: string
    /** Grid-tile derivative (~960px), committed under public/. */
    src?: string
    /** Featured/lightbox derivative (~2560px), committed under public/. */
    fullSrc?: string
    /** Untouched full-res original on Cloudflare R2; fetched only on demand. */
    originalSrc?: string
    /** Original file size, shown next to the download link. */
    originalBytes?: number
    alt?: string
    aspect: AspectRatio
    span: ColSpan
}

export interface PhotoSectionData {
    id: string
    numeral: string
    title: string
    titleItalic: string
    meta: string
    submeta: string
    photos: Photo[]
}

// Full-res masters live in the `adrianeddy-creative` R2 bucket under
// `creative/` and are exposed via this custom domain. See AGENTS.md
// ("Creative photos") before changing it.
const ORIGINALS_BASE = 'https://photos.adrianeddy.com/creative'

/** Committed WebP derivative, e.g. d('macaw') + '-960.webp'. */
const d = (slug: string) => `/assets/creative/${slug}`

/** Untouched full-res master on R2. */
const o = (slug: string) => `${ORIGINALS_BASE}/${slug}.jpg`

export const featuredPhoto: Photo = {
    id: 'featured-macaw',
    label: 'Plate 01 · Blue-and-gold macaw',
    src: `${d('macaw')}-960.webp`,
    fullSrc: `${d('macaw')}-2560.webp`,
    originalSrc: o('macaw'),
    originalBytes: 15477271,
    alt: 'Blue-and-gold macaw',
    aspect: '16/9',
    span: 6,
}

// Working-sheet plates: [label, slug, alt, aspect, original size in bytes].
// Slugs map 1:1 onto masters/creative/<slug>.jpg and R2.
const SHEET: Array<[string, string, string, AspectRatio, number]> = [
    ['01 · Fishing', 'landscape/fishing-1', 'Fishing scene', '3/2', 24367162],
    ['02 · Tacos', 'food/tacos-10', 'Tacos', '2/3', 19374745],
    [
        '03 · Birds',
        'animals/2-birds-together-2-2',
        'Two birds together',
        '1/1',
        7974206,
    ],
    [
        '04 · Nasi goreng',
        'food/10-07-nasi-goreng-2',
        'Nasi goreng',
        '3/2',
        20763539,
    ],
    ['05 · Fishing', 'landscape/fishing-3', 'Fishing scene', '2/3', 34549983],
    [
        '06 · Arowana',
        'animals/arowana-minnow-01-06-20-4',
        'Arowana fish',
        '5/4',
        9330347,
    ],
    ['07 · Coffee', 'food/coffee-august-6-4', 'Coffee', '3/2', 13054123],
    [
        '08 · Portrait',
        'landscape/dsc-1066-portrait',
        'Portrait',
        '2/3',
        8480371,
    ],
    [
        '09 · Arowana',
        'animals/arowana-minnow-01-06-20-7',
        'Arowana fish',
        '5/4',
        3912822,
    ],
    ['10 · Spread', 'food/10-07-2', 'Food spread', '3/2', 21301851],
    ['11 · Fishing', 'landscape/fishing-16', 'Fishing scene', '3/2', 10063369],
    [
        '12 · Arowana',
        'animals/arowana-minnow-01-06-20-2',
        'Arowana fish',
        '3/2',
        5869879,
    ],
    ['13 · Portrait', 'people/dsc-0698-portrait', 'Portrait', '3/2', 5545248],
    [
        '14 · Nasi goreng',
        'food/10-07-nasi-goreng-21',
        'Nasi goreng',
        '3/2',
        16754504,
    ],
    ['15 · Portrait', 'people/dsc-1021-portrait', 'Portrait', '3/2', 4142815],
    ['16 · Spread', 'food/10-07-3', 'Food spread', '3/2', 16216232],
    ['17 · Fishing', 'landscape/fishing-11', 'Fishing scene', '3/2', 20070847],
    ['18 · Fishing', 'people/fishing-22', 'Fishing scene', '3/2', 10280367],
]

export const photoSections: PhotoSectionData[] = [
    {
        id: 'working-sheet',
        numeral: 'Ⅰ',
        title: 'A ',
        titleItalic: 'working sheet',
        meta: '18 frames',
        submeta: 'uncategorized · in progress',
        photos: SHEET.map(([label, slug, alt, aspect, originalBytes], i) => ({
            id: `ws-${String(i + 1).padStart(2, '0')}`,
            label,
            src: `${d(slug)}-960.webp`,
            fullSrc: `${d(slug)}-2560.webp`,
            originalSrc: o(slug),
            originalBytes,
            alt,
            aspect,
            span: 2,
        })),
    },
]

export function flattenAllPhotos(): Array<Photo & { sectionLabel: string }> {
    return [
        { ...featuredPhoto, sectionLabel: 'Featured' },
        ...photoSections.flatMap((s) =>
            s.photos.map((p) => ({
                ...p,
                sectionLabel: `${s.title}${s.titleItalic}`,
            }))
        ),
    ]
}
