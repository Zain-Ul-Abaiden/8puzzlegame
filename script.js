
// Initialize the board
let board = [[2, 1, 4], [5, 3, 7], [6, 0, 8]];

// Function to shuffle the board
function shuffleBoard() {
  const flatBoard = board.flat();
  for (let i = flatBoard.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatBoard[i], flatBoard[j]] = [flatBoard[j], flatBoard[i]];
  }
  board = [];
  while (flatBoard.length) board.push(flatBoard.splice(0, 3));
}

// Function to find the position of the empty tile
function findEmptyTile() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        return { i, j };
      }
    }
  }
}
// Function to check if the move is valid
function isValidMove(i, j) {
  const emptyTile = findEmptyTile();
  return (Math.abs(i - emptyTile.i) === 1 && j === emptyTile.j) || (Math.abs(j - emptyTile.j) === 1 && i === emptyTile.i);
}

// Function to move the tile
function moveTile(i, j) {
  if (isValidMove(i, j)) {
    const emptyTile = findEmptyTile();
    const temp = board[i][j];
    board[i][j] = board[emptyTile.i][emptyTile.j];
    board[emptyTile.i][emptyTile.j] = temp;
    renderBoard();
    if (isGameFinished()) {
      alert("Congratulations! You solved the puzzle.");
    }
  }
}

// Function to check if the game is finished
function isGameFinished() {
  const flatBoard = board.flat();
  return flatBoard.every((num, index) => num === (index + 1) || num === 0);
}

// Function to render the board
function renderBoard() {
  const table = document.getElementById('board');
  table.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('td');
      cell.textContent = board[i][j] || '';
      cell.onclick = () => moveTile(i, j);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Initial rendering and shuffling
shuffleBoard();
renderBoard();