import { Lightbox } from 'adrianeddy-portfolio'

// Fullscreen overlay viewer (rendered solo: cardMode single, 900x600).
// Open on the featured plate — counter top-left, Close top-right, prev/next
// serif chevrons, sectionLabel · label caption below. src omitted so the
// large placeholder treatment renders.
export function Open() {
    return (
        <Lightbox
            photos={[
                {
                    id: 'featured-macaw',
                    label: 'Plate 01 · Blue-and-gold macaw',
                    alt: 'Blue-and-gold macaw',
                    aspect: '16/9',
                    span: 6,
                    sectionLabel: 'Featured',
                },
                {
                    id: 'ws-01',
                    label: '01 · Fishing',
                    alt: 'Fishing scene',
                    aspect: '3/2',
                    span: 2,
                    sectionLabel: 'A working sheet',
                },
                {
                    id: 'ws-02',
                    label: '02 · Tacos',
                    alt: 'Tacos',
                    aspect: '2/3',
                    span: 2,
                    sectionLabel: 'A working sheet',
                },
            ]}
            activeIndex={0}
            onClose={() => {}}
            onNavigate={() => {}}
        />
    )
}
