import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { HomePage } from './pages/HomePage'
import { DevRoadtripPage } from './pages/DevRoadtripPage'
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
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
