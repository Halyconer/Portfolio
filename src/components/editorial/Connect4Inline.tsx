import { useState, useRef } from 'react'
import { useConnect4 } from '../../hooks/useConnect4'

const ROWS = 6
const COLS = 7
const EMPTY_BOARD: number[][] = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(0)
)

// Literal colors, not theme tokens: the pieces must stay black (you) vs
// white (AI) on the fixed warm-wood board regardless of theme palette.
const COLOR_YOU = '#1a1a18'
const COLOR_AI = '#fbfaf6'
const COLOR_EMPTY = '#cfcaba'

export function Connect4Inline() {
    const { gameState, status, startGame, makeMove } = useConnect4()
    const [hoverCol, setHoverCol] = useState<number | null>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)

    const board = gameState?.board ?? EMPTY_BOARD
    const isPlaying = gameState !== null && !gameState.game_over
    const isGameOver = gameState?.game_over === true
    const hasNotStarted = gameState === null

    // Find the lowest empty row in the hovered column — that's where a piece
    // would actually land. We highlight only that cell, not the full column,
    // so the hover state matches Connect 4 gravity instead of just lighting up
    // a stripe.
    const landingRow =
        hoverCol !== null && isPlaying
            ? (() => {
                  for (let r = 0; r < ROWS; r++) {
                      if ((board[r]?.[hoverCol] ?? 0) === 0) return r
                  }
                  return null
              })()
            : null

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

    // Backdrop click closes — the click only registers on the <dialog> element
    // itself when it lands on the backdrop, since the inner content stops
    // propagation by being its own subtree.
    const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) closeModal()
    }

    return (
        <>
            <div className="p-8 relative border border-rule bg-paper-warm flex flex-col max-sm:p-5">
                <div className="flex justify-between items-baseline mb-4 gap-3">
                    <h3 className="font-serif font-light text-heading m-0 text-ink">
                        Beat a search algorithm.
                    </h3>
                    <span
                        className="text-xs whitespace-nowrap"
                        style={{ color: stateColor }}
                    >
                        ● {stateLabel}
                    </span>
                </div>

                {/* Decorative preview — non-interactive teaser of the board.
                 * aspect-[7/6] matches the dot grid so dots reach edge to edge
                 * with no side gaps. */}
                <button
                    type="button"
                    onClick={openModal}
                    aria-label="Open Connect 4"
                    className="group btn-reset mt-6 w-full aspect-[7/6] flex items-center justify-center relative border border-rule p-3 cursor-pointer"
                    style={{
                        background:
                            'linear-gradient(135deg, #f0ece0 0%, #d8d4c5 100%)',
                    }}
                >
                    <div className="grid grid-cols-7 gap-2 w-full group-hover:opacity-60 transition-opacity">
                        {Array.from({ length: ROWS * COLS }).map((_, i) => (
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

                {/* mt-auto anchors the footer to the card bottom — LightDemo
                 * does the same full-bleed hairline footer, so SET BRIGHTNESS /
                 * SET COLOR and PLAY GAME land flush on the same baseline. */}
                <div className="mt-auto pt-5 -mx-8 -mb-8 max-sm:-mx-5 max-sm:-mb-5">
                    <button
                        type="button"
                        onClick={openModal}
                        className="btn-reset w-full py-3.5 px-5 text-sm text-ink border-t border-rule hover:bg-ink hover:text-paper transition-colors whitespace-nowrap"
                    >
                        {ctaLabel} →
                    </button>
                </div>
            </div>

            {/* Native <dialog> handles focus trap, Esc-to-close, focus return,
             * and body scroll lock for free via showModal(). */}
            <dialog
                ref={dialogRef}
                onClick={onDialogClick}
                className="fixed inset-0 z-50 w-screen h-screen max-w-none max-h-none m-0 bg-paper-warm border-none p-0 overflow-hidden flex flex-col items-center justify-between open:flex hidden [&[open]]:flex select-none"
            >
                {/* Floating close button at top-right of screen */}
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

                {/* Top header */}
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
                            className="flex items-center gap-2 text-eyebrow-sm font-medium"
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

                {/* Main body */}
                <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-8 max-sm:p-5 min-h-0 overflow-hidden">
                    <div className="flex flex-col justify-center w-full md:w-[320px] shrink-0 order-2 md:order-1 text-left max-md:mt-2">
                        {/* Player legend */}
                        <div className="flex gap-6 items-center text-sm border-b border-rule pb-4 mb-4">
                            <span className="flex items-center gap-2">
                                <span
                                    className="inline-block w-4 h-4 rounded-full"
                                    style={{
                                        background: COLOR_YOU,
                                        boxShadow:
                                            'inset 0 2px 4px rgba(0,0,0,0.25)',
                                    }}
                                />
                                <span className="text-ink">You</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span
                                    className="inline-block w-4 h-4 rounded-full"
                                    style={{
                                        background: COLOR_AI,
                                        boxShadow:
                                            'inset 0 2px 4px rgba(0,0,0,0.35)',
                                    }}
                                />
                                <span className="text-ink">AI</span>
                            </span>
                        </div>

                        {/* Status message */}
                        <p
                            role="status"
                            aria-live="polite"
                            className="font-serif italic text-ink-soft text-[1.1rem] leading-[1.5] m-0 min-h-[3rem]"
                        >
                            {hasNotStarted
                                ? 'Click Start to spin up a game.'
                                : status}
                        </p>

                        {/* Action button */}
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={startGame}
                                className="w-full bg-ink text-paper border-none py-4 px-6 text-sm cursor-pointer hover:bg-ink-soft active:scale-[0.98] transition-all whitespace-nowrap text-center"
                            >
                                {hasNotStarted ? 'Start game' : 'New game'}{' '}
                                &rarr;
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center w-full min-h-0 order-1 md:order-2">
                        {/* Live board container */}
                        <div
                            className="p-4 grid grid-cols-7 gap-2.5 w-full aspect-[7/6] max-w-[min(90vw,72vh*1.166)] max-sm:gap-1.5 max-sm:p-3"
                            style={{
                                background:
                                    'linear-gradient(135deg, #f0ece0 0%, #d8d4c5 100%)',
                                border: '1px solid rgba(0,0,0,0.08)',
                                boxShadow:
                                    'inset 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(255,255,255,0.6)',
                                borderRadius: '8px',
                            }}
                        >
                            {Array.from({ length: ROWS }).map(
                                (_, displayRow) => {
                                    const dataRow = ROWS - 1 - displayRow
                                    return Array.from({ length: COLS }).map(
                                        (_, col) => {
                                            const v = board[dataRow]?.[col] ?? 0
                                            const canClick =
                                                isPlaying && v === 0
                                            const isLandingCell =
                                                canClick &&
                                                hoverCol === col &&
                                                landingRow === dataRow

                                            let bg = COLOR_EMPTY
                                            if (v === 1) bg = COLOR_YOU
                                            else if (v === 2) bg = COLOR_AI
                                            else if (isLandingCell)
                                                bg = COLOR_YOU

                                            const opacity = isLandingCell
                                                ? 0.35
                                                : 1

                                            return (
                                                <button
                                                    key={`${displayRow}-${col}`}
                                                    type="button"
                                                    onClick={() =>
                                                        canClick &&
                                                        makeMove(col)
                                                    }
                                                    onMouseEnter={() =>
                                                        setHoverCol(col)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoverCol(null)
                                                    }
                                                    disabled={!canClick}
                                                    aria-label={`Drop into column ${col + 1}`}
                                                    className={`aspect-square rounded-full border-0 transition-all duration-200 ${
                                                        canClick
                                                            ? 'cursor-pointer hover:scale-105 active:scale-95'
                                                            : 'cursor-default'
                                                    }`}
                                                    style={{
                                                        background: bg,
                                                        opacity,
                                                        boxShadow: v
                                                            ? 'inset 0 4px 10px rgba(0,0,0,0.25), 0 1.5px 0 rgba(255,255,255,0.4)'
                                                            : 'inset 0 3px 6px rgba(0,0,0,0.12)',
                                                    }}
                                                />
                                            )
                                        }
                                    )
                                }
                            )}
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}
