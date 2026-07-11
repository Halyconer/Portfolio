import { Hero } from 'adrianeddy-portfolio'

// The home-page opener: staged display headline, measure-width intro, CTA row,
// framed portrait. Takes no props — one canonical render.
// (The portrait loads /assets/headshot.jpg, which the site serves; the bundle
// doesn't ship it, so the frame shows an empty image in cards.)
export function Default() {
    return <Hero />
}
