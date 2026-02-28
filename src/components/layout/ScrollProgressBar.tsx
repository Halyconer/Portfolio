import { useScrollProgress } from '../../hooks/useScrollProgress'

export function ScrollProgressBar() {
    const progress = useScrollProgress()

    return (
        <div
            className="fixed top-0 right-0 w-2 h-full bg-gradient-to-b from-primary to-primary-dark z-[999] origin-top"
            style={{ transform: `scaleY(${progress})` }}
        />
    )
}
