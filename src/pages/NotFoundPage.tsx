import { Link } from 'react-router-dom'

import { Section } from '../components/ui/Section'

export function NotFoundPage() {
    return (
        <Section
            divided={false}
            spacing="none"
            className="py-32 text-center max-md:py-20"
        >
            <div className="text-eyebrow mb-6">§ 404 — Off the page</div>
            <h1 className="font-serif font-normal text-hero m-0 text-ink">
                Not found<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 measure mx-auto font-serif font-light text-[1.35rem] text-ink-soft max-sm:text-[1.1rem]">
                That route doesn't exist. Probably a stale link or a typo.
            </p>
            <Link to="/" className="link-rule text-eyebrow mt-8">
                ← Back to Portfolio
            </Link>
        </Section>
    )
}
