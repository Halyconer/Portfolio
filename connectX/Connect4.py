import random
import numpy as np
from scipy.signal import convolve2d
import time
from scoring import minimax

'''
Connect4 initial game implementation with the goal of implementing a basic minmax-based AI.
At the moment, the player always goes first, and the AI randomly selects a column.

Another objective is to have a 6x7x2x2 matrix: layered matricies to evaluate the board state, which will allow for a more sophisticated AI.

To do list:
1. Fix magic number issue

Notes:
- Currently board references are very confusing as to when the numpy array or the Connect4 object is being referenced.
'''

class Connect4:
  ROW_COUNT = 6
  COL_COUNT = 7

  KERNELS = [
        np.array([[1, 1, 1, 1]]),  # Horizontal
        np.array([[1], [1], [1], [1]]),  # Vertical
        np.eye(4, dtype=int),  # Positive diagonal
        np.fliplr(np.eye(4, dtype=int)),  # Negative diagonal
    ]

  def __init__(self):
    self.board = self.create_board()
    self.game_over = False
    self.turn = 0
    self.valid_cols = [c for c in range(self.COL_COUNT)] 

  def create_board(self):
    return np.zeros((self.ROW_COUNT, self.COL_COUNT))

  def drop_piece(self, row, col, piece):
    self.board[row][col] = piece

  def is_valid(self, col):
    self.valid_cols = [c for c in range(self.COL_COUNT) if self.board[self.ROW_COUNT - 1][c] == 0] # Changed this implemntation to dynamically update alongside the AI
    return col in self.valid_cols # Will return True if the column is valid, otherwise False

  def next_open(self, col):
    for row in range(self.ROW_COUNT):
      if self.board[row][col] == 0:
        return row

  def win(self, piece):
    """ 
    Checking for a win using 2D convolution. Like a mini neural network 
    It works by sliding each win pattern across the board with scipy's convolve2d function,
    then checking the resulting matrix for any values >= 4, which would indicate a win.

    Note to self:
    Passes work by first converting the board into a binary matrix where the player's pieces are represented as 1s,
    so even if the piece is 2, it is marked as 1 in the convolution check. 
    """
    # Use convolution to check for winning patterns
    player_board = (self.board == piece).astype(int)

    # Create kernels for convolution
    for kernel in self.KERNELS:
      overlap = convolve2d(player_board, kernel, mode='valid')
      if np.any(overlap >= 4):
        return True
    return False

  def print_board(self):
    print(np.flip(self.board, 0))

  def reset_game(self):
    self.board = self.create_board()
    self.game_over = False
    self.turn = 0
    self.valid_cols = [c for c in range(self.COL_COUNT)]  

  def play(self):
    while not self.game_over:
      if self.turn == 0:
        self.print_board()
        col = int(input(f"Make your selection (0-{self.COL_COUNT - 1}): "))

        if self.is_valid(col):
            row = self.next_open(col)
            self.drop_piece(row, col, self.turn + 1)
            if self.win(self.turn + 1):
                self.print_board()
                print(f"You win!")
                self.game_over = True
            else:
                self.turn = (self.turn + 1) % 2  
        else:
            print("Invalid move. Try another column.")
      
      # AI decision making
      elif self.turn == 1: 
        col = minimax(self.board, 4, True)[0]  # AI selects a column using minimax algorithm
        print(f"AI is making a move...")
        print(f"AI selects column {col}")

        if self.is_valid(col):
            row = self.next_open(col)
            self.drop_piece(row, col, self.turn + 1)
            if self.win(self.turn + 1):
                self.print_board()
                print(f"AI wins!")
                self.game_over = True
            else:
                self.turn = (self.turn + 1) % 2 

        else: # If the AI selects an invalid column, it will randomly select a valid column
            valid_cols = [c for c in range(self.COL_COUNT) if self.is_valid(c)] # Get all valid columns
            if valid_cols: # If there are valid columns, AI will pick one
                col = random.choice(valid_cols)
                row = self.next_open(col)
                self.drop_piece(row, col, self.turn + 1)
                if self.win(self.turn + 1):
                    self.print_board()
                    print(f"AI wins!")
                    self.game_over = True
                else:
                    self.turn = (self.turn + 1) % 2 

  def main_game_loop(self):
    """Main game loop that handles multiple games"""
    while True:
      self.play()
      print("Would you like to play again? (yes/no)")
      if input().lower() != "yes":
        print("Thanks for playing!")
        break
      else:
        self.reset_game()

'''
Note to self:
A main game loop is implemented to allow players to play more than one game without restarting the program and without
a recursive function call that could lead to a stack overflow.
'''

if __name__ == "__main__":
    game = Connect4() # Initialize the game
    game.main_game_loop() # Start the main game loop
