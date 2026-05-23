import { SectionEyebrow } from './SectionEyebrow'
import { MetaField } from './MetaField'

const metaItems: Array<{ k: string; v: string }> = [
    { k: 'Currently', v: 'Quant research, NYU thesis on calendar effects.' },
    { k: 'Looking for', v: 'Summer & Fall 2026 · NYC · Quant / SWE.' },
    { k: 'Stack', v: 'Python · R · Pandas · React · SQL · Flask.' },
    { k: 'Tooling', v: 'IBKR · Supabase · Raspberry Pi · Vercel.' },
    {
        k: 'Working on',
        v: 'A thesis on calendar-effect anomalies & a Black–Scholes pricing engine.',
    },
    {
        k: 'Reading',
        v: '“My Life as a Quant”, FT Alphaville, Marginal Revolution.',
    },
    {
        k: 'Off-screen',
        v: 'A Connect 4 minimax, a Pi-controlled bulb, slow espresso.',
    },
]

export function About() {
    return (
        <section
            id="about"
            className="px-8 py-20 border-b border-rule-strong max-md:px-5 max-md:py-12 max-sm:px-4 max-sm:py-10"
        >
            <SectionEyebrow numeral="01" label="About" className="mb-5" />

            <div className="grid grid-cols-[1.4fr_1fr] gap-20 items-stretch max-md:grid-cols-1 max-md:gap-10">
                {/* Left: paragraph centered vertically against the taller meta
                 * column so both sides feel anchored to the same row. */}
                <div className="flex flex-col justify-center">
                    <p className="drop-cap m-0 measure font-serif font-light text-[1.65rem] leading-[1.4] text-ink max-md:text-[1.35rem] max-sm:text-[1.15rem]">
                        I care about the boring infrastructure of markets — how
                        prices form, how strategies decay, how to size a position
                        so you don't blow up. The best questions in economics are
                        empirical; the best empirical work needs code that runs.
                    </p>
                </div>

                <div className="border-l border-rule-strong pl-8 grid grid-cols-1 gap-y-5 max-md:border-l-0 max-md:border-t max-md:pl-0 max-md:pt-8">
                    {metaItems.map((row) => (
                        <MetaField key={row.k} label={row.k} variant="inline">
                            {row.v}
                        </MetaField>
                    ))}
                </div>
            </div>
        </section>
    )
}
