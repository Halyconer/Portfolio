import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { HomePage } from './pages/HomePage'
import { CartProvider } from './ecommerce/context/CartProvider'
import { SearchProvider } from './ecommerce/context/SearchProvider'
import { DevRoadtripPage } from './pages/DevRoadtripPage'
import { EcommerceSite } from './ecommerce/page'
import { CartPage } from './ecommerce/pages/CartPage'
import './index.css'

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'dev-roadtrip', element: <DevRoadtripPage /> },
        ],
    },
    {
        path: '/e-commerce',
        element: (
            <CartProvider>
                <SearchProvider>
                    <EcommerceSite />
                </SearchProvider>
            </CartProvider>
        ),
        children: [
            { index: true, element: <EcommerceSite /> },
            { path: 'cart', element: <CartPage /> },
        ],
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
