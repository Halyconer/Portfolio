export type AspectRatio = '5/4' | '1/1' | '3/2' | '2/3' | '16/9'

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6

export interface Photo {
    id: string
    label: string
    src?: string
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

export const featuredPhoto: Photo = {
    id: 'featured-macaw',
    label: 'Plate 01 · Blue-and-gold macaw',
    src: '/assets/creative/macaw.jpg',
    alt: 'Blue-and-gold macaw',
    aspect: '16/9',
    span: 6,
}

// Working-sheet plates: [label, path, alt, aspect]. All span 2 columns.
const c = (p: string) => `/assets/creative/${p}`
const SHEET: Array<[string, string, string, AspectRatio]> = [
    ['01 · Fishing', c('landscape/fishing-1.JPG'), 'Fishing scene', '3/2'],
    ['02 · Tacos', c('food/tacos-10.JPG'), 'Tacos', '2/3'],
    [
        '03 · Birds',
        c('animals/2 birds together-2-2.JPG'),
        'Two birds together',
        '1/1',
    ],
    [
        '04 · Nasi goreng',
        c('food/10-07 Nasi goreng-2.JPG'),
        'Nasi goreng',
        '3/2',
    ],
    ['05 · Fishing', c('landscape/fishing-3.JPG'), 'Fishing scene', '2/3'],
    [
        '06 · Arowana',
        c('animals/Arowana-Minnow-01-06-20-4.JPG'),
        'Arowana fish',
        '5/4',
    ],
    ['07 · Coffee', c('food/Coffee August 6-4.JPG'), 'Coffee', '3/2'],
    ['08 · Portrait', c('landscape/DSC_1066-portrait.jpg'), 'Portrait', '2/3'],
    [
        '09 · Arowana',
        c('animals/Arowana-Minnow-01-06-20-7.JPG'),
        'Arowana fish',
        '5/4',
    ],
    ['10 · Spread', c('food/10-07-2.JPG'), 'Food spread', '3/2'],
    ['11 · Fishing', c('landscape/fishing-16.JPG'), 'Fishing scene', '3/2'],
    [
        '12 · Arowana',
        c('animals/Arowana-Minnow-01-06-20-2.JPG'),
        'Arowana fish',
        '3/2',
    ],
    ['13 · Portrait', c('People/DSC_0698-portrait.jpg'), 'Portrait', '3/2'],
    [
        '14 · Nasi goreng',
        c('food/10-07 Nasi goreng-21.JPG'),
        'Nasi goreng',
        '3/2',
    ],
    ['15 · Portrait', c('People/DSC_1021-portrait.jpg'), 'Portrait', '3/2'],
    ['16 · Spread', c('food/10-07-3.JPG'), 'Food spread', '3/2'],
    ['17 · Fishing', c('landscape/fishing-11.JPG'), 'Fishing scene', '3/2'],
    ['18 · Fishing', c('People/fishing-22.JPG'), 'Fishing scene', '3/2'],
]

export const photoSections: PhotoSectionData[] = [
    {
        id: 'working-sheet',
        numeral: 'Ⅰ',
        title: 'A ',
        titleItalic: 'working sheet',
        meta: '18 frames',
        submeta: 'uncategorized · in progress',
        photos: SHEET.map(([label, src, alt, aspect], i) => ({
            id: `ws-${String(i + 1).padStart(2, '0')}`,
            label,
            src,
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
