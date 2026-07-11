import { PhotoSection } from 'adrianeddy-portfolio'

// Mirrors CreativePage usage: the "A working sheet" section header (numeral /
// serif title with italic accent / meta column) over the multi-column tile
// flow. Six frames from the real sheet, srcs omitted so the styled
// placeholders render instead of broken /assets paths.
export function WorkingSheet() {
    return (
        <PhotoSection
            section={{
                id: 'working-sheet',
                numeral: 'Ⅰ',
                title: 'A ',
                titleItalic: 'working sheet',
                meta: '6 frames',
                submeta: 'uncategorized · in progress',
                photos: [
                    {
                        id: 'ws-01',
                        label: '01 · Fishing',
                        alt: 'Fishing scene',
                        aspect: '3/2',
                        span: 2,
                    },
                    {
                        id: 'ws-02',
                        label: '02 · Tacos',
                        alt: 'Tacos',
                        aspect: '2/3',
                        span: 2,
                    },
                    {
                        id: 'ws-03',
                        label: '03 · Birds',
                        alt: 'Two birds together',
                        aspect: '1/1',
                        span: 2,
                    },
                    {
                        id: 'ws-04',
                        label: '04 · Nasi goreng',
                        alt: 'Nasi goreng',
                        aspect: '3/2',
                        span: 2,
                    },
                    {
                        id: 'ws-05',
                        label: '05 · Fishing',
                        alt: 'Fishing scene',
                        aspect: '2/3',
                        span: 2,
                    },
                    {
                        id: 'ws-06',
                        label: '06 · Arowana',
                        alt: 'Arowana fish',
                        aspect: '5/4',
                        span: 2,
                    },
                ],
            }}
            startIndex={1}
            onPhotoClick={() => {}}
        />
    )
}
