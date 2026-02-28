import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ChocolatePopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [chocolates, setChocolates] = useState<
        { id: number; left: number }[]
    >([])
    const [plusOne, setPlusOne] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleAccept = () => {
        setIsVisible(false)
        const left = Math.random() * (window.innerWidth - 60)
        setChocolates([{ id: Date.now(), left }])
        setPlusOne(true)
        setTimeout(() => setChocolates([]), 3000)
        setTimeout(() => setPlusOne(false), 2000)
    }

    const handleDecline = () => {
        setIsVisible(false)
    }

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-4"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 flex-wrap">
                            <span className="text-slate-dark text-[0.9rem]">
                                This website uses chocolate to ensure you get
                                the best experience on our website.
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAccept}
                                    className="py-2 px-4 rounded-md font-medium text-[0.85rem] bg-gradient-to-br from-primary to-primary-light text-white border-none cursor-pointer transition-all duration-200 hover:from-primary-dark hover:to-primary"
                                >
                                    Accept Chocolate
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="py-2 px-4 rounded-md font-medium text-[0.85rem] bg-white text-slate-dark border border-border cursor-pointer transition-all duration-200 hover:bg-[#f8f9fa]"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {chocolates.map((choc) => (
                <motion.div
                    key={choc.id}
                    className="fixed text-6xl z-[9999] pointer-events-none"
                    style={{ left: choc.left, top: -100 }}
                    animate={{ y: window.innerHeight + 200 }}
                    transition={{ duration: 3, ease: 'easeIn' }}
                >
                    🍫
                </motion.div>
            ))}

            <AnimatePresence>
                {plusOne && (
                    <motion.div
                        className="fixed right-8 top-1/2 z-[9999] text-2xl font-bold text-primary pointer-events-none"
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -30 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                    >
                        +1 🍫
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
