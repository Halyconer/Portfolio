import { NavBar } from './components/NavBar'
import { Outlet } from 'react-router-dom'

export function EcommerceLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <NavBar />
            <Outlet />
            <footer className="border-t border-neutral-100 bg-white py-12">
                <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-neutral-500">
                        &copy; {new Date().getFullYear()} Virellio. Crafted for
                        excellence.
                    </div>
                    <div className="flex gap-6 text-sm font-medium text-neutral-600">
                        <a
                            href="#"
                            className="hover:text-black transition-colors"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="hover:text-black transition-colors"
                        >
                            Terms
                        </a>
                        <a
                            href="#"
                            className="hover:text-black transition-colors"
                        >
                            Support
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
