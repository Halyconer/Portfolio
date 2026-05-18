import random
import copy
import numpy as np  

def minimax(board: np.ndarray, depth: int, maximizing_player: bool, alpha: float = float('-inf'), beta: float = float('inf')) -> tuple:
    '''
    Remember how minimax works: The algorithm recursively explores all possible moves up to a certain depth. It picks a maximizing move, 
    then it assumes the opponent will pick the minimizing move, and so on. The depth is a limit to how many moves ahead the algorithm will look.

    The algorithm will then return a score of the board state for the maximizing player. If the maximizing player is the AI, it will return a positive score for a win,
    a negative score for a loss, and 0 for a draw. 
    '''
    valid_positions = get_valid_moves(board)

    if is_terminal_node(board) or depth == 0:
        if is_terminal_node(board):
            if check_win(board, 2):
                return (None, float('inf'))
            elif check_win(board, 1):
                return (None, float('-inf'))
            else:
                return (None, 0)  # Game is a draw
        else:  # Depth limit reached
            return (None, score_position(board, 2) if maximizing_player else score_position(board, 1))

    if maximizing_player:
        column = random.choice(valid_positions) # select a random column as a placeholder
        max_eval = float('-inf')

        for col in valid_positions: 
            row = next_open_row(board, col)
            board_copy = board.copy()
            board_copy[row][col] = 2  # AI's piece
            
            new_eval = minimax(board_copy, depth - 1, False, alpha, beta)[1]

            if new_eval > max_eval:
                max_eval = new_eval
                column = col

            # Alpha-Beta Pruning
            # At first run, alpha is -inf and beta is inf. So it will ALWAYS update alpha
            alpha = max(alpha, new_eval)

            # If the opponent can limit the AI's score BELOW the AI's maximizing move, prune the search tree
            # by breaking out of the loop. We try the next column. IT ONLY BREAKS IF THE AI'S MAXIMIZING MOVE IS NOT BETTER THAN THE MINIMIZING PLAYER'S BETA.
            # BECAUSE IN THE RECURSIVE CALL, WHEN THE MINIMIZING PLAYER IS CALLED, IT WILL RETURN A SCORE THAT IS LESS THAN OR EQUAL TO BETA.
            

            # beta here is the minimum score the minimizing player is willing to accept.
            # If the AI's maximizing move is greater than the minimizing player's beta, we can prune
            # the search tree because the minimizing player will not choose this move.

            if beta <= alpha:
                break

        return column, max_eval # final return statement

    else:  # Minimizing player's turn
        min_eval = float('inf')
        column = random.choice(valid_positions)

        for col in valid_positions:
            row = next_open_row(board, col)
            board_copy = board.copy()
            board_copy[row][col] = 1  # Player's piece

            new_eval = minimax(board_copy, depth - 1, True, alpha, beta)[1]

            if new_eval < min_eval:
                min_eval = new_eval
                column = col

            beta = min(beta, new_eval)
            if beta <= alpha:
                break

        return column, min_eval # final return statement

def is_terminal_node(board):
    return check_win(board, 1) or check_win(board, 2) or len(get_valid_moves(board)) == 0

def get_valid_moves(board):
    ROW_COUNT, COL_COUNT = board.shape
    return [c for c in range(COL_COUNT) if board[ROW_COUNT - 1][c] == 0]

def next_open_row(board, col):
    ROW_COUNT = board.shape[0]
    for row in range(ROW_COUNT):
        if board[row][col] == 0:
            return row
    return None

def check_win(board, piece):
    """Check if the given piece has won using convolution"""
    from scipy.signal import convolve2d
    
    # Convert board to binary for the piece
    player_board = (board == piece).astype(int)
    
    # Define Kernels the same way as in Connect4.py
    kernels = [
        np.array([[1, 1, 1, 1]]),  # Horizontal
        np.array([[1], [1], [1], [1]]),  # Vertical
        np.eye(4, dtype=int),  # Positive diagonal
        np.fliplr(np.eye(4, dtype=int)),  # Negative diagonal
    ]
    
    # Check each pattern
    for kernel in kernels:
        overlap = convolve2d(player_board, kernel, mode='valid')
        if np.any(overlap >= 4):
            return True
    return False

def score_position(board, piece):
    """ 
    Scoring function to evaluate the board position for a given piece.

    Next objective:
    Obviously improve the scoring logic.
    But ultimately, we want to use a convolutional neural network to evaluate the board state. This is because
    a CNN can learn to recognize patterns in the board state that lead to winning moves. Need to do research on how to implement this,
    and if we will maintain a minmax-based AI.
    """
    ROW_COUNT, COL_COUNT = board.shape
    score = 0

    # Scoring Center Column because it is the most important column
    center_col = board[:, COL_COUNT // 2] # a single column from the board at the moment
    center_count = np.count_nonzero(center_col == piece) # Count the number of (AI) pieces in the center column
    score += 5 * center_count # So the more pieces in the center column, the higher the score

    # Scoring Horizontal
    for r in range(ROW_COUNT):
        for c in range(COL_COUNT - 3):
            window = board[r, c:c+4]
            score += window_score(window, piece)

    # Scoring Vertical
    for c in range(COL_COUNT):
        for r in range(ROW_COUNT - 3):
            window = board[r:r+4, c]
            score += window_score(window, piece)

    # Scoring Positive Diagonal
    for r in range(ROW_COUNT - 3):
        for c in range(COL_COUNT - 3):
            window = [board[r+i][c+i] for i in range(4)]
            score += window_score(window, piece)

    # Scoring Negative Diagonal
    for r in range(3, ROW_COUNT):
        for c in range(COL_COUNT - 3):
            window = [board[r-i][c+i] for i in range(4)]
            score += window_score(window, piece)

    return score
  
def window_score(window, piece):
    """
    Works by evaluating a 4-piece window in the board.
    It will return a score based on the number of pieces in the window.
    If a potential drop allows for an opponent win, it will return a negative score.
    If a potential drop allows for a win, it will return a positive score.

    Remember that the scoring logic is not here, but in the score_position function.
    This is just a helper function to evaluate a 4-piece window.

    Basically game theory.

    Need to figure out a better negative scoring system.
    """

    # Just check if the piece is 1 or 2, and set the opponent accordingly. If piece is set to 2, then this is the AI, and the opponent is 1.
    if piece == 1:
        opponent = 2
    else:
        opponent = 1

    # Count pieces in window
    piece_count = np.count_nonzero(window == piece)
    empty_count = np.count_nonzero(window == 0)
    opponent_count = np.count_nonzero(window == opponent)

    # AI threat scoring
    if piece_count == 4:
        return 100
    elif piece_count == 3 and empty_count == 1:
        return 10
    elif piece_count == 2 and empty_count == 2:
        return 5
     
    # Player threat scoring
    if opponent_count == 3 and empty_count == 1:
        return -80  
     
    return 0