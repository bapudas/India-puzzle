const board = document.getElementById('puzzle-board');
const shuffleButton = document.getElementById('shuffle-button');
const tiles = [];
let emptyTile = { row: 3, col: 3 };

// Initialize the board
function initializeBoard() {
  for (let i = 0; i < 15; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = i + 1;
    tile.addEventListener('click', () => moveTile(i));
    tiles.push(tile);
    board.appendChild(tile);
  }
  // Add empty tile
  const empty = document.createElement('div');
  empty.classList.add('tile', 'empty');
  tiles.push(empty);
  board.appendChild(empty);
}

// Shuffle the tiles
function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i].textContent, tiles[j].textContent] = [tiles[j].textContent, tiles[i].textContent];
  }
  updateBoard();
}

// Move a tile
function moveTile(index) {
  const tile = tiles[index];
  const tileRow = Math.floor(index / 4);
  const tileCol = index % 4;

  if (
    (Math.abs(tileRow - emptyTile.row) === 1 && tileCol === emptyTile.col) ||
    (Math.abs(tileCol - emptyTile.col) === 1 && tileRow === emptyTile.row)
  ) {
    // Swap tile with empty tile
    tiles[emptyTile.row * 4 + emptyTile.col].textContent = tile.textContent;
    tile.textContent = '';
    emptyTile = { row: tileRow, col: tileCol };
    updateBoard();
    checkWin();
  }
}

// Update the board display
function updateBoard() {
  tiles.forEach((tile, index) => {
    tile.textContent = tile.textContent;
    if (tile.textContent === '') {
      tile.classList.add('empty');
    } else {
      tile.classList.remove('empty');
    }
  });
}

// Check if the player has won
function checkWin() {
  const isWin = tiles.every((tile, index) => {
    return tile.textContent === '' || parseInt(tile.textContent) === index + 1;
  });
  if (isWin) {
    alert('Congratulations! You won!');
  }
}

// Event listener for shuffle button
shuffleButton.addEventListener('click', shuffleTiles);

// Initialize the game
initializeBoard();
shuffleTiles();
