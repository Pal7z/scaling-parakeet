function createChessboard(n) {
  const chessboard = document.getElementById('chessboard');
  chessboard.innerHTML = ''; // Clear the board
  chessboard.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement('div');
      cell.className = `cell ${(i + j) % 2 === 0 ? 'white' : 'black'}`;
      chessboard.appendChild(cell);
    }
  }
}

function isSafe(board, row, col, n) {
  for (let i = 0; i < col; i++) {
    if (board[row][i] === 1) return false;
  }

  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) return false;
  }

  for (let i = row, j = col; j >= 0 && i < n; i++, j--) {
    if (board[i][j] === 1) return false;
  }

  return true;
}

function solveNQUtil(board, col, n, solutions) {
  if (col >= n) {
    solutions.push(board.map(row => [...row])); // Clone board state
    return;
  }

  for (let i = 0; i < n; i++) {
    if (isSafe(board, i, col, n)) {
      board[i][col] = 1;
      solveNQUtil(board, col + 1, n, solutions);
      board[i][col] = 0;
    }
  }
}

function solveNQueens() {
  const n = parseInt(document.getElementById('n-value').value);
  const board = Array.from({ length: n }, () => Array(n).fill(0));
  const solutions = [];

  solveNQUtil(board, 0, n, solutions);

  if (solutions.length > 0) {
    createChessboard(n);
    animateSolutions(solutions[0], n); // Use the first solution
  } else {
    alert("No solution exists for N = " + n);
  }
}

function animateSolutions(board, n) {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('queen', 'queen-animation'));

  setTimeout(() => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 1) {
          const cell = cells[i * n + j];
          cell.classList.add('queen', 'queen-animation');
        }
      }
    }
  }, 100); // Delay to ensure chessboard is rendered before animation
}
