from copy import copy
from flask import Flask, request, jsonify, send_from_directory
import json
from Connect4 import Connect4

app = Flask(__name__)

game = Connect4()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# For the new game button
@app.route('/play', methods=['POST'])
def new_game():
    global game
    game.reset_game()
    print(f"New game - valid_cols: {game.valid_cols}")  # DEBUG
    print(f"Board shape: {game.board.shape}")  # DEBUG
    return jsonify({
        'board': game.board.tolist(),
        'message': 'Game has been reset.',
        'turn': game.turn,
        'valid_cols': game.valid_cols  
    })

@app.route('/game_state', methods=['GET'])
def game_state():
    return jsonify({
        'board': game.board.tolist(),
        'turn': game.turn,
        'valid_cols': game.valid_cols, 
        'game_over': game.game_over
    })

@app.route('/move', methods=['POST'])
def make_move():
    global game
    data = request.json
    col = data.get('column')
    
    print(f"Move request - column: {col}, type: {type(col)}")  # DEBUG
    print(f"Valid columns: {game.valid_cols}")  # DEBUG
    
    if not game.is_valid(col):
        print(f"Invalid move detected for column {col}")  # DEBUG
        return jsonify({'error': 'Invalid move. Try another column.'}), 400
    
    # Make player move
    row = game.next_open(col)
    game.drop_piece(row, col, game.turn + 1)

    if game.win(game.turn + 1):
        return jsonify({
            'game_over': True,
            'board': game.board.tolist(),
            'message': f'Player {game.turn + 1} wins!',
            'turn': game.turn,
            'valid_cols': game.valid_cols  
        })
    
    game.turn = (game.turn + 1) % 2  

    # Save board state after player move but before AI move
    board_after_player = copy(game.board.tolist())

    ai_col = None
    if not game.game_over and game.turn == 1:
        from scoring import minimax
        ai_col = minimax(game.board, 4, True)[0]
        
        if game.is_valid(ai_col):
            ai_row = game.next_open(ai_col)
            game.drop_piece(ai_row, ai_col, game.turn + 1)
            
            if game.win(game.turn + 1):
                return jsonify({
                    'board_before_ai': board_after_player,
                    'board_after_ai': game.board.tolist(),
                    'game_over': True,
                    'winner': 'ai',
                    'turn': game.turn,
                    'valid_cols': game.valid_cols, 
                    'ai_move': ai_col
                })
            
            game.turn = (game.turn + 1) % 2
    
    return jsonify({
        'board_before_ai': board_after_player,  # Board with only player's move
        'board_after_ai': game.board.tolist(),  # Board with both player's and AI's moves
        'game_over': game.game_over,
        'turn': game.turn,
        'valid_cols': game.valid_cols, 
        'ai_move': ai_col
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
