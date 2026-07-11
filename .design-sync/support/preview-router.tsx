import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

// Several components (Masthead, Projects, CreativeHero, …) render react-router
// <Link>/<NavLink> and need a Router context to mount in preview cards.
export function PreviewRouter({ children }: { children?: ReactNode }) {
    return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
}
