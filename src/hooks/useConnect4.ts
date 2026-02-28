import { useState, useRef } from 'react'
import { apiFetch } from '../lib/api'
import type { GameState, MoveResponse, PlayResponse } from '../types/connect4'

export function useConnect4() {
    const [gameState, setGameState] = useState<GameState | null>(null)
    const [status, setStatus] = useState('Click "New Game" to start!')
    const [isOpen, setIsOpen] = useState(false)
    const isProcessing = useRef(false)

    const startGame = async () => {
        isProcessing.current = true
        setStatus('Starting new game...')

        try {
            const response = await apiFetch<PlayResponse>('/connect4/play', {
                method: 'POST',
            })
            setGameState({
                board: response.board,
                game_over: response.game_over,
                valid_cols: response.valid_cols,
            })
            setStatus('Your turn! Click a column to drop your piece.')
        } catch {
            setStatus('Failed to start new game. Check server connection.')
        }

        isProcessing.current = false
    }

    const makeMove = async (col: number) => {
        if (isProcessing.current || !gameState || gameState.game_over) return
        if (!gameState.valid_cols.includes(col)) {
            setStatus('Invalid move! Column is full.')
            return
        }

        isProcessing.current = true
        setStatus('Processing move...')

        try {
            const response = await apiFetch<MoveResponse>('/connect4/move', {
                method: 'POST',
                body: JSON.stringify({ column: col }),
            })

            if (response.game_over) {
                setGameState({
                    board: response.board_after_ai || response.board,
                    game_over: true,
                    valid_cols: response.valid_cols,
                })
                if (response.winner === 'player') {
                    setStatus('You won! Great job!')
                } else if (response.winner === 'ai') {
                    setStatus('AI wins! Try again?')
                } else if (response.winner === 'tie') {
                    setStatus("It's a tie! Well played!")
                } else {
                    setStatus('Game over!')
                }
                isProcessing.current = false
            } else {
                // Show player move immediately
                setGameState({
                    board: response.board_before_ai,
                    game_over: false,
                    valid_cols: response.valid_cols,
                })
                setStatus('Your move made! AI is thinking...')

                // Show AI move after 1s delay
                setTimeout(() => {
                    setGameState({
                        board: response.board_after_ai,
                        game_over: response.game_over,
                        valid_cols: response.valid_cols,
                    })
                    if (
                        response.ai_move !== null &&
                        response.ai_move !== undefined
                    ) {
                        setStatus(
                            `AI dropped in column ${response.ai_move + 1}. Your turn!`
                        )
                    } else {
                        setStatus(
                            'Your turn! Click a column to drop your piece.'
                        )
                    }
                    isProcessing.current = false
                }, 1000)
            }
        } catch {
            setStatus(
                'Connection error! Make sure the game server is running on your Pi.'
            )
            isProcessing.current = false
        }
    }

    return { gameState, status, isOpen, setIsOpen, startGame, makeMove }
}
