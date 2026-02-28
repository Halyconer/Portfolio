export type Board = (0 | 1 | 2)[][]

export interface GameState {
    board: Board
    game_over: boolean
    valid_cols: number[]
}

export interface MoveResponse {
    board_before_ai: Board
    board_after_ai: Board
    ai_move: number | null
    game_over: boolean
    winner?: 'player' | 'ai' | 'tie'
    valid_cols: number[]
    board: Board
}

export interface PlayResponse {
    board: Board
    game_over: boolean
    valid_cols: number[]
}
