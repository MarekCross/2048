import Grid from './Grid.js';
import Tile from './Tile.js';

const gameBoard = document.getElementById('game-board');

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();

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
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    default:
      setupInput();
      return;
  }
  setupInput();
}
function moveUp() {
  return slideTiles(grid.cellsByColumn);
}
function moveDown() {
  return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()));
}
function moveLeft() {
  return slideTiles(grid.cellsByRow);
}
function moveRight() {
  return slideTiles(grid.cellsByRow.map(row => [...row].reverse()));
}

function slideTiles(cells) {
  cells.forEach(group => {
    for (let i = 1; i < group.lenght; i++) {
      const cell = group[i];
      if (cell.tile == null) continue;
      let lastvalidCell;
      for (let j = i - 1; j >= 0; j--) {
        const movetoCell = group[j];
        if (!movetoCell.canAccept(cell.tile)) break;
        lastvalidCell = movetoCell;
      }
      if (lastvalidCell != null) {
        if (lastvalidCell.tile != null) {
          lastvalidCell.mergeTile = cell.tile;
        } else {
          lastvalidCell.tile = cell.tile;
        }
        cell.tile = null;
      }
    }
  });
}
