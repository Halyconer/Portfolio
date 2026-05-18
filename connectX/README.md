# ConnectX

An implementation of [Keith Galli's](https://www.youtube.com/watch?v=UYgyRArKDEs&list=PLFCB5Dp81iNV_inzM-R9AKkZZlePCZdtV&index=2) Connect4 game.
Objective for this project is to learn ML fundamentals that we will not get to learn during undergrad:
- Tensor Construction
- Matrix Convolutions
- (Practice doing) Manual Encoding
- Data augmentation through vectorization

## Setup and Installation

This project uses [Poetry](https://python-poetry.org/) for dependency management.

1.  **Clone the repository:**
    ```bash
    git clone <https://github.com/Halyconer/ConnectX/tree/main>
    cd ConnectX
    ```

2.  **Install dependencies using Poetry:**
    Make sure you have Poetry installed. Then, run the following command in the project root to create a virtual environment and install the required packages (`pandas`, `numpy`, `scipy`).
    ```bash
    poetry install
    ```

## How to Play

To run the game, use Poetry to execute the main script:

```bash
poetry run python Connect4.py
```
