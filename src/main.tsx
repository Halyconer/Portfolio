import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { CartProvider } from './ecommerce/context/CartProvider'
import './index.css'

// Lazy-load non-home routes so a first visit only ships the home bundle.
// React resolves these on demand the first time the route is matched.
const DevRoadtripPage = lazy(() =>
    import('./pages/DevRoadtripPage').then((m) => ({
        default: m.DevRoadtripPage,
    }))
)
const CreativePage = lazy(() =>
    import('./pages/CreativePage').then((m) => ({ default: m.CreativePage }))
)
const EcommerceSite = lazy(() =>
    import('./ecommerce/page').then((m) => ({ default: m.EcommerceSite }))
)

function RouteFallback() {
    return (
        <div className="px-8 py-20 text-center font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
            Loading…
        </div>
    )
}

function lazyRoute(node: React.ReactNode) {
    return <Suspense fallback={<RouteFallback />}>{node}</Suspense>
}

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'dev-roadtrip', element: lazyRoute(<DevRoadtripPage />) },
            { path: 'creative', element: lazyRoute(<CreativePage />) },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
    {
        path: '/e-commerce',
        element: <CartProvider>{lazyRoute(<EcommerceSite />)}</CartProvider>,
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
