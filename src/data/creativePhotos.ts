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
        id: 'working-sheet',
        numeral: 'Ⅰ',
        title: 'A ',
        titleItalic: 'working sheet',
        meta: '18 frames',
        submeta: 'uncategorized · in progress',
        photos: [
            {
                id: 'ws-01',
                label: '01 · Fishing',
                src: '/assets/creative/landscape/fishing-1.JPG',
                alt: 'Fishing scene',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-02',
                label: '02 · Tacos',
                src: '/assets/creative/food/tacos-10.JPG',
                alt: 'Tacos',
                aspect: '2/3',
                span: 2,
            },
            {
                id: 'ws-03',
                label: '03 · Birds',
                src: '/assets/creative/animals/2 birds together-2-2.JPG',
                alt: 'Two birds together',
                aspect: '1/1',
                span: 2,
            },
            {
                id: 'ws-04',
                label: '04 · Nasi goreng',
                src: '/assets/creative/food/10-07 Nasi goreng-2.JPG',
                alt: 'Nasi goreng',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-05',
                label: '05 · Fishing',
                src: '/assets/creative/landscape/fishing-3.JPG',
                alt: 'Fishing scene',
                aspect: '2/3',
                span: 2,
            },
            {
                id: 'ws-06',
                label: '06 · Arowana',
                src: '/assets/creative/animals/Arowana-Minnow-01-06-20-4.JPG',
                alt: 'Arowana fish',
                aspect: '5/4',
                span: 2,
            },
            {
                id: 'ws-07',
                label: '07 · Coffee',
                src: '/assets/creative/food/Coffee August 6-4.JPG',
                alt: 'Coffee',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-08',
                label: '08 · Portrait',
                src: '/assets/creative/landscape/DSC_1066-portrait.jpg',
                alt: 'Portrait',
                aspect: '2/3',
                span: 2,
            },
            {
                id: 'ws-09',
                label: '09 · Arowana',
                src: '/assets/creative/animals/Arowana-Minnow-01-06-20-7.JPG',
                alt: 'Arowana fish',
                aspect: '5/4',
                span: 2,
            },
            {
                id: 'ws-10',
                label: '10 · Spread',
                src: '/assets/creative/food/10-07-2.JPG',
                alt: 'Food spread',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-11',
                label: '11 · Fishing',
                src: '/assets/creative/landscape/fishing-16.JPG',
                alt: 'Fishing scene',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-12',
                label: '12 · Arowana',
                src: '/assets/creative/animals/Arowana-Minnow-01-06-20-2.JPG',
                alt: 'Arowana fish',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-13',
                label: '13 · Portrait',
                src: '/assets/creative/People/DSC_0698-portrait.jpg',
                alt: 'Portrait',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-14',
                label: '14 · Nasi goreng',
                src: '/assets/creative/food/10-07 Nasi goreng-21.JPG',
                alt: 'Nasi goreng',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-15',
                label: '15 · Portrait',
                src: '/assets/creative/People/DSC_1021-portrait.jpg',
                alt: 'Portrait',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-16',
                label: '16 · Spread',
                src: '/assets/creative/food/10-07-3.JPG',
                alt: 'Food spread',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-17',
                label: '17 · Fishing',
                src: '/assets/creative/landscape/fishing-11.JPG',
                alt: 'Fishing scene',
                aspect: '3/2',
                span: 2,
            },
            {
                id: 'ws-18',
                label: '18 · Fishing',
                src: '/assets/creative/People/fishing-22.JPG',
                alt: 'Fishing scene',
                aspect: '3/2',
                span: 2,
            },
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
