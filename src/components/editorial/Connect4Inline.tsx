import { useRef, useState } from 'react'

import { useConnect4 } from '../../hooks/useConnect4'
import { Card } from '../ui/Card'

const ROWS = 6
const COLS = 7
const EMPTY_BOARD: number[][] = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(0)
)
const BOARD_BG = 'linear-gradient(135deg, #f0ece0 0%, #d8d4c5 100%)'

// Literal colors, not theme tokens: pieces stay black (you) vs white (AI)
// on the fixed warm-wood board regardless of theme palette.
const COLOR_YOU = '#1a1a18'
const COLOR_AI = '#fbfaf6'
const COLOR_EMPTY = '#cfcaba'

// Legend chip — a round piece swatch plus its label.
function Chip({
    color,
    label,
    glow,
}: {
    color: string
    label: string
    glow: string
}) {
    return (
        <span className="flex items-center gap-2">
            <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ background: color, boxShadow: glow }}
            />
            <span className="text-ink">{label}</span>
        </span>
    )
}

export function Connect4Inline() {
    const { gameState, status, startGame, makeMove } = useConnect4()
    const [hoverCol, setHoverCol] = useState<number | null>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)

    const board = gameState?.board ?? EMPTY_BOARD
    const isPlaying = gameState !== null && !gameState.game_over
    const isGameOver = gameState?.game_over === true
    const hasNotStarted = gameState === null

    // Highlight the lowest empty cell in the hovered column — where the piece
    // would actually land — matching Connect 4 gravity.
    const firstEmpty = (col: number) => {
        for (let r = 0; r < ROWS; r++) if (board[r]?.[col] === 0) return r
        return null
    }
    const landingRow =
        hoverCol !== null && isPlaying ? firstEmpty(hoverCol) : null

    const stateLabel = isPlaying
        ? 'YOUR TURN'
        : isGameOver
          ? 'GAME OVER'
          : 'AI READY'
    const stateColor = isPlaying
        ? 'var(--color-status-active)'
        : isGameOver
          ? 'var(--color-accent-deep)'
          : 'var(--color-status-online)'
    const ctaLabel = hasNotStarted
        ? 'Play game'
        : isGameOver
          ? 'Play again'
          : 'Resume game'

    const openModal = () => {
        if (hasNotStarted) startGame()
        dialogRef.current?.showModal()
    }
    const closeModal = () => dialogRef.current?.close()
    // Backdrop click closes: the click only registers on the <dialog> itself
    // when it lands on the backdrop.
    const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) closeModal()
    }

    return (
        <>
            <Card
                title="Play Connect 4!"
                aside={
                    <span
                        className="text-xs whitespace-nowrap"
                        style={{ color: stateColor }}
                    >
                        ● {stateLabel}
                    </span>
                }
                actions={
                    <button
                        type="button"
                        onClick={openModal}
                        className="card-action"
                    >
                        {ctaLabel} →
                    </button>
                }
            >
                {/* Decorative teaser board — aspect-[7/6] matches the dot grid
                 * so dots reach edge to edge. */}
                <button
                    type="button"
                    onClick={openModal}
                    aria-label="Open Connect 4"
                    className="group btn-reset mt-6 w-full aspect-[7/6] flex items-center justify-center relative border border-rule p-3 cursor-pointer"
                    style={{ background: BOARD_BG }}
                >
                    <div className="grid grid-cols-7 gap-2 w-full group-hover:opacity-60 transition-opacity">
                        {Array.from({ length: ROWS * COLS }, (_, i) => (
                            <div
                                key={i}
                                className="aspect-square rounded-full"
                                style={{
                                    background: COLOR_EMPTY,
                                    boxShadow:
                                        'inset 0 2px 6px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.5)',
                                }}
                            />
                        ))}
                    </div>
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-ink text-paper py-2 px-4 text-sm">
                            Open board →
                        </span>
                    </span>
                </button>
            </Card>

            {/* Native <dialog> gives focus trap, Esc-to-close, focus return,
             * and body scroll lock for free via showModal(). */}
            <dialog
                ref={dialogRef}
                onClick={onDialogClick}
                className="fixed inset-0 z-50 w-screen h-screen max-w-none max-h-none m-0 bg-paper-warm border-none p-0 overflow-hidden flex flex-col items-center justify-between open:flex hidden [&[open]]:flex select-none"
            >
                <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close game"
                    className="fixed top-6 right-6 max-sm:top-4 max-sm:right-4 z-50 p-3 text-muted hover:text-ink hover:scale-110 active:scale-95 transition-all cursor-pointer bg-paper/85 backdrop-blur-md rounded-full border border-rule hover:border-rule-strong flex items-center justify-center shadow-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="w-full border-b border-rule px-8 py-5 max-sm:px-5 max-sm:py-4 flex justify-between items-center bg-paper/50 backdrop-blur-xs">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="font-serif font-light text-heading m-0 text-ink">
                            Connect 4 &middot;{' '}
                            <em className="italic text-accent">minimax</em>
                        </h3>
                        <span className="text-xs text-muted opacity-75">
                            Minimax α-β · depth 6
                        </span>
                    </div>
                    <div className="flex items-center gap-6 pr-16 max-sm:pr-12">
                        <span
                            className="flex items-center gap-2 text-label font-medium"
                            style={{ color: stateColor }}
                        >
                            <span
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ backgroundColor: stateColor }}
                            />
                            {stateLabel}
                        </span>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-8 max-sm:p-5 min-h-0 overflow-hidden">
                    <div className="flex flex-col justify-center w-full md:w-[320px] shrink-0 order-2 md:order-1 text-left max-md:mt-2">
                        <div className="flex gap-6 items-center text-sm border-b border-rule pb-4 mb-4">
                            <Chip
                                color={COLOR_YOU}
                                label="You"
                                glow="inset 0 2px 4px rgba(0,0,0,0.25)"
                            />
                            <Chip
                                color={COLOR_AI}
                                label="AI"
                                glow="inset 0 2px 4px rgba(0,0,0,0.35)"
                            />
                        </div>

                        <p
                            role="status"
                            aria-live="polite"
                            className="font-serif italic text-ink-soft text-[1.1rem] leading-[1.5] m-0 min-h-[3rem]"
                        >
                            {hasNotStarted
                                ? 'Click Start to spin up a game.'
                                : status}
                        </p>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={startGame}
                                className="btn-ink w-full py-4 px-6 text-sm active:scale-[0.98] transition-all whitespace-nowrap text-center"
                            >
                                {hasNotStarted ? 'Start game' : 'New game'}{' '}
                                &rarr;
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center w-full min-h-0 order-1 md:order-2">
                        <div
                            className="p-4 grid grid-cols-7 gap-2.5 w-full aspect-[7/6] max-w-[min(90vw,72vh*1.166)] max-sm:gap-1.5 max-sm:p-3"
                            style={{
                                background: BOARD_BG,
                                border: '1px solid rgba(0,0,0,0.08)',
                                boxShadow:
                                    'inset 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(255,255,255,0.6)',
                                borderRadius: '8px',
                            }}
                        >
                            {Array.from({ length: ROWS * COLS }, (_, i) => {
                                const displayRow = Math.floor(i / COLS)
                                const col = i % COLS
                                // Board rows come bottom-up from the API;
                                // render top-down.
                                const dataRow = ROWS - 1 - displayRow
                                const v = board[dataRow]?.[col] ?? 0
                                const canClick = isPlaying && v === 0
                                const isLandingCell =
                                    canClick &&
                                    hoverCol === col &&
                                    landingRow === dataRow
                                const bg =
                                    v === 1
                                        ? COLOR_YOU
                                        : v === 2
                                          ? COLOR_AI
                                          : isLandingCell
                                            ? COLOR_YOU
                                            : COLOR_EMPTY

                                return (
                                    <button
                                        key={`${displayRow}-${col}`}
                                        type="button"
                                        onClick={() =>
                                            canClick && makeMove(col)
                                        }
                                        onMouseEnter={() => setHoverCol(col)}
                                        onMouseLeave={() => setHoverCol(null)}
                                        disabled={!canClick}
                                        aria-label={`Drop into column ${col + 1}`}
                                        className={`aspect-square rounded-full border-0 transition-all duration-200 ${
                                            canClick
                                                ? 'cursor-pointer hover:scale-105 active:scale-95'
                                                : 'cursor-default'
                                        }`}
                                        style={{
                                            background: bg,
                                            opacity: isLandingCell ? 0.35 : 1,
                                            boxShadow: v
                                                ? 'inset 0 4px 10px rgba(0,0,0,0.25), 0 1.5px 0 rgba(255,255,255,0.4)'
                                                : 'inset 0 3px 6px rgba(0,0,0,0.12)',
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}
