const items: Array<{ k: string; v: string }> = [
    { k: 'Currently', v: 'Quant research, NYU thesis on calendar effects' },
    { k: 'Looking for', v: 'Summer & Fall 2026 · NYC · Quant / SWE' },
    { k: 'Stack', v: 'Python · R · Pandas · React · SQL · Flask' },
    { k: 'Tooling', v: 'IBKR · Supabase · Raspberry Pi · Vercel' },
]

export function TLDR() {
    return (
        <section className="px-8 py-12 bg-paper-warm border-t border-b border-rule-strong max-md:px-5 max-md:py-8 max-sm:px-4 max-sm:py-6">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted mb-6 whitespace-nowrap">
                <span className="text-accent">&#8251;</span> The Short Version
            </div>
            <div className="grid grid-cols-4 gap-x-8 max-md:grid-cols-2 max-md:gap-y-6 max-xs:grid-cols-1">
                {items.map((it) => (
                    <div key={it.k}>
                        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted mb-2.5 pb-2 border-b border-rule">
                            {it.k}
                        </div>
                        <div className="font-serif font-light text-[1.25rem] leading-[1.25] tracking-[-0.005em] text-ink max-sm:text-[1.1rem]">
                            {it.v}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
