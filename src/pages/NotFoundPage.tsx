import { Link } from 'react-router-dom'

export function NotFoundPage() {
    return (
        <section className="px-8 py-32 text-center max-md:px-5 max-md:py-20">
            <div className="text-eyebrow mb-6">§ 404 — Off the page</div>
            <h1 className="font-serif font-normal text-[6rem] leading-[0.9] tracking-[-0.04em] text-ink m-0 max-md:text-[4rem]">
                Not found<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 measure mx-auto font-serif font-light text-[1.35rem] text-ink-soft max-sm:text-[1.1rem]">
                That route doesn't exist. Probably a stale link or a typo.
            </p>
            <Link
                to="/"
                className="inline-block mt-8 font-mono text-[11px] tracking-[0.16em] uppercase text-ink border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
            >
                ← Back to Portfolio
            </Link>
        </section>
    )
}
