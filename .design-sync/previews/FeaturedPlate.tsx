import { FeaturedPlate } from 'adrianeddy-portfolio'

// The full-bleed 16/9 opening plate on /creative, plus its mono caption row.
// `src` is intentionally omitted: the bundle doesn't ship /assets images, and
// omitting src renders the site's styled placeholder treatment.
export function Default() {
    return (
        <FeaturedPlate
            photo={{
                id: 'featured-macaw',
                label: 'Plate 01 · Blue-and-gold macaw',
                alt: 'Blue-and-gold macaw',
                aspect: '16/9',
                span: 6,
            }}
            onClick={() => {}}
        />
    )
}
