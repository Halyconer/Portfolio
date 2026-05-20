import { Outlet } from 'react-router-dom'
import { FloatingNav } from './components/layout/FloatingNav'
import { Footer } from './components/layout/Footer'
import { ChocolatePopup } from './components/chocolate/ChocolatePopup'

// Editorial pass:
//   - Default font swapped from font-poly to font-inter. Body text in a
//     decorative serif reads heavy at small sizes. Poly is now reserved for
//     headings (h1/h2) where it earns its keep.
//   - Removed `text-justify`. Justified text creates ugly word spacing,
//     especially on narrow widths. Editorial typography is left-aligned.
//   - Removed <ScrollProgressBar> (the thick blue gradient bar on the right).
//   - Removed the <AnimatePresence><motion.div> page-transition wrapper.
//     The brief fade-and-slide between routes was a "feels dynamic" effect
//     that mainly told users "this site is animated." A confident editorial
//     layout doesn't need to announce route changes.
export function App() {
    return (
        <div className="font-inter text-ink leading-relaxed p-4 max-w-[1400px] mx-auto overflow-x-hidden box-border">
            <FloatingNav />
            <ChocolatePopup />
            <Outlet />
            <Footer />
        </div>
    )
}
