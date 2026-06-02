import { useState, useRef } from 'react'
import { useConnect4 } from '../../hooks/useConnect4'

const ROWS = 6
const COLS = 7
const EMPTY_BOARD: number[][] = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(0)
)

const COLOR_YOU = 'var(--color-accent)'
const COLOR_AI = 'var(--color-ink)'
const COLOR_EMPTY = 'var(--color-paper)'

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
            <div className="p-8 relative border border-rule flex flex-col max-sm:p-5">
                <div className="flex justify-between items-baseline text-eyebrow-sm mb-3 gap-3 flex-wrap">
                    <span>
                        Demo 02 &mdash; Connect 4 &middot; Minimax + &alpha;-&beta;
                    </span>
                    <span style={{ color: stateColor }}>&#9679; {stateLabel}</span>
                </div>
                <h3 className="font-serif font-light text-[2.2rem] tracking-[-0.02em] m-0 text-ink max-sm:text-[1.6rem]">
                    Beat a search algorithm.
                </h3>
                <p className="mt-3 text-muted text-[0.95rem] leading-[1.55] measure">
                    Minimax with alpha-beta pruning at medium depth. Drop pieces
                    into any column. You're terracotta, I'm ink.
                </p>

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
                        <span className="bg-ink text-paper py-2 px-4 font-mono text-[11px] tracking-[0.16em] uppercase">
                            Open board &rarr;
                        </span>
                    </span>
                </button>

                {/* mt-auto anchors the CTA stack to the card bottom — LightDemo
                 * does the same so SET BRIGHTNESS / SET COLOR and PLAY GAME
                 * land on the same baseline. */}
                <div className="mt-auto">
                    <div className="mt-5 flex justify-between items-center gap-4 flex-wrap">
                        <span className="text-eyebrow-sm opacity-70 tabular-nums">
                            depth=6
                        </span>
                        <button
                            type="button"
                            onClick={openModal}
                            className="bg-ink text-paper border-none py-3 px-5 font-mono text-[11px] tracking-[0.16em] uppercase cursor-pointer hover:bg-ink-soft transition-colors whitespace-nowrap"
                        >
                            {ctaLabel} &rarr;
                        </button>
                    </div>
                    <p
                        role="status"
                        aria-live="polite"
                        className="mt-3 font-serif italic text-ink-soft text-[0.95rem] m-0 min-h-6 leading-6"
                    >
                        {hasNotStarted
                            ? 'Open the board to spin up a game.'
                            : status}
                    </p>
                </div>
            </div>

            {/* Native <dialog> handles focus trap, Esc-to-close, focus return,
             * and body scroll lock for free via showModal(). */}
            <dialog
                ref={dialogRef}
                onClick={onDialogClick}
                className="bg-paper-warm border border-rule-strong p-0 w-[92vw] max-w-[560px] backdrop:bg-ink/60"
            >
                <div className="p-8 max-sm:p-5">
                    <div className="flex justify-between items-baseline text-eyebrow-sm mb-3 gap-3 flex-wrap">
                        <span style={{ color: stateColor }}>
                            &#9679; {stateLabel}
                        </span>
                        <button
                            type="button"
                            onClick={closeModal}
                            aria-label="Close"
                            className="btn-reset font-mono text-[11px] tracking-[0.16em] uppercase text-muted hover:text-ink transition-colors cursor-pointer"
                        >
                            Close &times;
                        </button>
                    </div>
                    <h3 className="font-serif font-light text-[1.8rem] tracking-[-0.02em] m-0 text-ink max-sm:text-[1.4rem]">
                        Connect 4 &middot;{' '}
                        <em className="italic text-accent">minimax</em>.
                    </h3>

                    {/* Player legend */}
                    <div className="mt-4 flex gap-5 items-center text-eyebrow-sm">
                        <span className="flex items-center gap-2">
                            <span
                                className="inline-block w-3 h-3 rounded-full"
                                style={{
                                    background: COLOR_YOU,
                                    boxShadow:
                                        'inset 0 2px 4px rgba(0,0,0,0.25)',
                                }}
                            />
                            You
                        </span>
                        <span className="flex items-center gap-2">
                            <span
                                className="inline-block w-3 h-3 rounded-full"
                                style={{
                                    background: COLOR_AI,
                                    boxShadow:
                                        'inset 0 2px 4px rgba(0,0,0,0.35)',
                                }}
                            />
                            AI
                        </span>
                        <span className="ml-auto opacity-70 tabular-nums">
                            depth=6
                        </span>
                    </div>

                    {/* Live board */}
                    <div
                        className="mt-4 p-3 grid grid-cols-7 gap-1.5 mx-auto max-w-[440px] max-sm:gap-1 max-sm:p-2.5"
                        style={{
                            background:
                                'linear-gradient(135deg, #f0ece0 0%, #d8d4c5 100%)',
                            border: '1px solid rgba(0,0,0,0.08)',
                            boxShadow:
                                'inset 0 2px 6px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.6)',
                        }}
                    >
                        {Array.from({ length: ROWS }).map((_, displayRow) => {
                            const dataRow = ROWS - 1 - displayRow
                            return Array.from({ length: COLS }).map((_, col) => {
                                const v = board[dataRow]?.[col] ?? 0
                                const canClick = isPlaying && v === 0
                                const isLandingCell =
                                    canClick &&
                                    hoverCol === col &&
                                    landingRow === dataRow

                                let bg = COLOR_EMPTY
                                if (v === 1) bg = COLOR_YOU
                                else if (v === 2) bg = COLOR_AI
                                else if (isLandingCell) bg = COLOR_YOU

                                const opacity = isLandingCell ? 0.35 : 1

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
                                                ? 'cursor-pointer'
                                                : 'cursor-default'
                                        }`}
                                        style={{
                                            background: bg,
                                            opacity,
                                            boxShadow: v
                                                ? 'inset 0 2px 6px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.4)'
                                                : 'inset 0 2px 4px rgba(0,0,0,0.12)',
                                        }}
                                    />
                                )
                            })
                        })}
                    </div>

                    <div className="mt-5 flex justify-between items-center gap-4 flex-wrap">
                        <p
                            role="status"
                            aria-live="polite"
                            className="font-serif italic text-ink-soft text-[1rem] flex-1 min-w-[200px] m-0"
                        >
                            {hasNotStarted
                                ? 'Click Start to spin up a game.'
                                : status}
                        </p>
                        <button
                            type="button"
                            onClick={startGame}
                            className="bg-ink text-paper border-none py-3 px-5 font-mono text-[11px] tracking-[0.16em] uppercase cursor-pointer hover:bg-ink-soft transition-colors whitespace-nowrap"
                        >
                            {hasNotStarted ? 'Start game' : 'New game'} &rarr;
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
