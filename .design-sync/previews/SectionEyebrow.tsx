import { SectionEyebrow } from 'adrianeddy-portfolio'

// The mono section marker that opens every editorial section: § NN — Label.
export function About() {
    return <SectionEyebrow numeral="01" label="About" />
}

// Ported from DevRoadtripPage: eyebrow above a serif display headline.
export function WithHeadline() {
    return (
        <div>
            <SectionEyebrow numeral="02" label="How it works" className="mb-3" />
            <h2 className="font-serif font-normal text-[3rem] tracking-[-0.03em] m-0 leading-[1.05] text-ink">
                From your browser to the bulb.
            </h2>
        </div>
    )
}
