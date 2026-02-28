import type { Board } from '../../types/connect4'

interface Connect4BoardProps {
    board: Board
    onCellClick: (col: number) => void
}

export function Connect4Board({ board, onCellClick }: Connect4BoardProps) {
    const rows = []
    // Render rows from 5 down to 0 (top of visual board = row 5 in data)
    for (let row = 5; row >= 0; row--) {
        for (let col = 0; col < 7; col++) {
            const piece = board[row]?.[col] ?? 0
            let colorClass = 'bg-white'
            if (piece === 1)
                colorClass =
                    'bg-player-red shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]'
            if (piece === 2)
                colorClass =
                    'bg-player-yellow shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]'

            rows.push(
                <div
                    key={`${row}-${col}`}
                    onClick={() => onCellClick(col)}
                    className={`w-[60px] h-[60px] rounded-full border-3 border-board-dark cursor-pointer transition-all duration-300 max-sm:w-[35px] max-sm:h-[35px] max-sm:border-2 max-xs:w-[45px] max-xs:h-[45px] max-xs:border-2 ${colorClass} ${
                        piece === 0
                            ? 'hover:bg-border hover:scale-105'
                            : ''
                    }`}
                />
            )
        }
    }

    return (
        <div className="grid grid-cols-7 gap-[5px] bg-board p-4 rounded-2xl mx-auto my-5 justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] w-fit max-sm:gap-0.5 max-sm:p-2 max-sm:my-4">
            {rows}
        </div>
    )
}
