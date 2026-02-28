import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Connect4Board } from './Connect4Board'
import { Button } from '../ui/Button'
import type { useConnect4 } from '../../hooks/useConnect4'

type Connect4State = ReturnType<typeof useConnect4>

interface Connect4ModalProps {
    state: Connect4State
}

export function Connect4Modal({ state }: Connect4ModalProps) {
    const { gameState, status, isOpen, setIsOpen, startGame, makeMove } = state

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        if (isOpen) window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [isOpen, setIsOpen])

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOpen(false)
                    }}
                >
                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] max-w-[600px] w-[90%] max-h-[90vh] overflow-y-auto max-sm:w-[95%] max-sm:p-4 max-sm:mx-2.5 max-sm:my-5"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center mb-5 border-b-2 border-[#f0f0f0] pb-4">
                            <h2 className="text-heading font-semibold text-xl max-sm:text-2xl">
                                Connect 4 vs AI
                            </h2>
                            <span
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-bold cursor-pointer text-[#666] hover:text-player-red"
                            >
                                &times;
                            </span>
                        </div>

                        <div className="text-center text-lg font-semibold my-5 text-heading max-sm:text-base max-sm:my-4">
                            {status}
                        </div>

                        <div className="flex justify-center my-5">
                            <Button onClick={startGame}>New Game</Button>
                        </div>

                        {gameState && (
                            <Connect4Board
                                board={gameState.board}
                                onCellClick={makeMove}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}
