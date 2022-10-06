import Grid from './Grid.js';
import Tile from './Tile.js';

const gameBoard = document.getElementById('game-board');

const grid = new Grid(gameBoard);
console.log(grid.randomEmptyCell());
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();
console.log(grid.cellsByCalumn);

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true });
}
function handleInput(e) {
  console.log(e.key);
  switch (e.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArropLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    default:
      setupInput();
      break;
  }
  setupInput();
}
function moveUp() {
  slideTiles();
}

function slideTiles(cells) {
  cells.forEach(group => {
    for (let i = 1; i < group.lenght; i++) {
      const cell = group[i];
      for (let j = i - 1; j >= 0; j--) {
        const movetoCell = group[j];
        if (!movetoCell.canAccept(cell.tile)) break;
      }
    }
  });
}
