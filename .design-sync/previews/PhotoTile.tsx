import { PhotoTile } from 'adrianeddy-portfolio'

// A single gallery tile as it sits inside a PhotoSection column. Without a
// `src` the tile renders the site's square placeholder with the mono frame
// label — the intentional not-yet-loaded treatment.
export function Single() {
    return (
        <div style={{ maxWidth: 280 }}>
            <PhotoTile
                photo={{
                    id: 'ws-03',
                    label: '03 · Birds',
                    alt: 'Two birds together',
                    aspect: '1/1',
                    span: 2,
                }}
                onClick={() => {}}
            />
        </div>
    )
}

// Tiles stacked in a column the way the multi-column section flow packs them
// (each tile carries its own mb-3 for the vertical rhythm).
export function ColumnStack() {
    return (
        <div style={{ maxWidth: 240 }}>
            <PhotoTile
                photo={{
                    id: 'ws-01',
                    label: '01 · Fishing',
                    alt: 'Fishing scene',
                    aspect: '3/2',
                    span: 2,
                }}
                onClick={() => {}}
            />
            <PhotoTile
                photo={{
                    id: 'ws-02',
                    label: '02 · Tacos',
                    alt: 'Tacos',
                    aspect: '2/3',
                    span: 2,
                }}
                onClick={() => {}}
            />
        </div>
    )
}
