export type AspectRatio =
    | '5/4'
    | '4/5'
    | '1/1'
    | '3/2'
    | '2/3'
    | '16/9'
    | '21/9'
    | '3/4'

export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6

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

export const photoSections: PhotoSectionData[] = [
    {
        id: 'grad',
        numeral: 'Ⅰ',
        title: 'Graduation, ',
        titleItalic: 'May 2024',
        meta: '10 frames',
        submeta: 'NYU Stern · Washington Sq.',
        photos: [
            { id: 'g1', label: '01 · Walk · 05:24', aspect: '3/2', span: 4 },
            { id: 'g2', label: '02 · Portrait', aspect: '3/4', span: 2 },
            { id: 'g3', label: '03 · Diploma', aspect: '1/1', span: 2 },
            { id: 'g4', label: '04 · Cap & gown', aspect: '1/1', span: 2 },
            { id: 'g5', label: '05 · Family', aspect: '1/1', span: 2 },
            { id: 'g6', label: '06 · Stern atrium', aspect: '3/4', span: 2 },
            { id: 'g7', label: '07 · Confetti', aspect: '3/2', span: 4 },
            { id: 'g8', label: '08 · Roommates', aspect: '1/1', span: 2 },
            { id: 'g9', label: '09 · Champagne', aspect: '1/1', span: 2 },
            { id: 'g10', label: '10 · Aftermath', aspect: '1/1', span: 2 },
        ],
    },
    {
        id: 'city',
        numeral: 'Ⅱ',
        title: 'A city that ',
        titleItalic: 'never quite holds still',
        meta: '11 frames',
        submeta: 'NYC · 2024 — 2026',
        photos: [
            {
                id: 'c1',
                label: '01 · Skyline · reflection',
                aspect: '21/9',
                span: 6,
            },
            { id: 'c2', label: '02 · Yellow cabs', aspect: '1/1', span: 2 },
            { id: 'c3', label: '03 · Subway · 14th', aspect: '1/1', span: 2 },
            { id: 'c4', label: '04 · Crosswalk', aspect: '1/1', span: 2 },
            {
                id: 'c5',
                label: '05 · Brownstone · W. Village',
                aspect: '3/4',
                span: 2,
            },
            {
                id: 'c6',
                label: '06 · Bridge · golden hour',
                aspect: '3/2',
                span: 4,
            },
            {
                id: 'c7',
                label: '07 · Times Sq. · long exposure',
                aspect: '3/2',
                span: 4,
            },
            { id: 'c8', label: '08 · Steam · 7am', aspect: '3/4', span: 2 },
            { id: 'c9', label: '09 · Rooftop · LIC', aspect: '1/1', span: 2 },
            {
                id: 'c10',
                label: '10 · Brooklyn · midnight',
                aspect: '1/1',
                span: 2,
            },
            { id: 'c11', label: '11 · Avenue · dusk', aspect: '1/1', span: 2 },
        ],
    },
    {
        id: 'fnb',
        numeral: 'Ⅲ',
        title: "What's ",
        titleItalic: 'on the plate',
        meta: '10 frames',
        submeta: 'Kitchens · bars · service',
        photos: [
            { id: 'f1', label: '01 · Negroni', aspect: '3/4', span: 2 },
            {
                id: 'f2',
                label: '02 · Pasta · table light',
                aspect: '3/2',
                span: 4,
            },
            { id: 'f3', label: '03 · Espresso · pour', aspect: '1/1', span: 2 },
            { id: 'f4', label: '04 · Garnish', aspect: '1/1', span: 2 },
            { id: 'f5', label: '05 · Knife edge', aspect: '1/1', span: 2 },
            { id: 'f6', label: '06 · Steak & marrow', aspect: '3/2', span: 4 },
            { id: 'f7', label: '07 · Plating', aspect: '3/4', span: 2 },
            { id: 'f8', label: '08 · Tasting menu', aspect: '1/1', span: 2 },
            { id: 'f9', label: '09 · Wine · pour', aspect: '1/1', span: 2 },
            { id: 'f10', label: '10 · Bar · last call', aspect: '1/1', span: 2 },
        ],
    },
]

export function flattenAllPhotos(): Array<Photo & { sectionLabel: string }> {
    const flat: Array<Photo & { sectionLabel: string }> = [
        { ...featuredPhoto, sectionLabel: 'Featured' },
    ]
    for (const section of photoSections) {
        for (const photo of section.photos) {
            flat.push({
                ...photo,
                sectionLabel: `${section.title}${section.titleItalic}`,
            })
        }
    }
    return flat
}
