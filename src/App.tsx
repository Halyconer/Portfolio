import { useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FloatingNav } from './components/layout/FloatingNav'
import { ScrollProgressBar } from './components/layout/ScrollProgressBar'
import { Footer } from './components/layout/Footer'
import { ChocolatePopup } from './components/chocolate/ChocolatePopup'

export function App() {
    const location = useLocation()

    return (
        <div className="font-poly text-ink leading-relaxed p-4 max-w-[1400px] mx-auto overflow-x-hidden box-border text-justify max-sm:text-left">
            <ScrollProgressBar />
            <FloatingNav />
            <ChocolatePopup />
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
            <Footer />
        </div>
    )
}
