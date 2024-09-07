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

function solveNQUtil(board, col, n) {
  if (col >= n) return true;

  for (let i = 0; i < n; i++) {
    if (isSafe(board, i, col, n)) {
      board[i][col] = 1;
      if (solveNQUtil(board, col + 1, n)) return true;
      board[i][col] = 0;
    }
  }
  return false;
}

function solveNQueens() {
  const n = parseInt(document.getElementById('n-value').value);
  const board = Array.from({ length: n }, () => Array(n).fill(0));

  if (solveNQUtil(board, 0, n)) {
    createChessboard(n);
    renderQueens(board, n);
  } else {
    alert("No solution exists for N = " + n);
  }
}

function renderQueens(board, n) {
  const cells = document.querySelectorAll('.cell');
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 1) {
        cells[i * n + j].classList.add('queen');
      }
    }
  }
}
