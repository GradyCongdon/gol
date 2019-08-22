const rows = 40;
const columns = 20;

let grid = [];
let newGrid = [];


const render = () => {
  for (let y = 0; y < columns; y++) {
    let row = [];
    for (let x = 0; x < rows; x++) {
      row.push(grid[y][x] ? '@' : '.' );
    }
    line = row.join('');
    console.log(line);
  }
}


const countNeighbors = (x,y) => {
  let sum = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const xx = (x + dx + rows) % rows;
      const yy = (y + dy + columns) % columns;
      sum = sum + grid[yy][xx];
    }
  }
  sum = sum - grid[y][x]
  return sum;
}

const makeNewCell = (cell, neighbors) => {
  if (!cell && neighbors === 3) return 1;
  else if (cell && (neighbors < 2 || neighbors > 3))  return 0;
  else return cell;
}

const tick = () => {
  for (let y = 0; y < columns; y++) {
    const row = [];
    for (let x = 0; x < rows; x++) {
      const neighbors = countNeighbors(x,y);
      const cell = grid[y][x];
      const newCell = makeNewCell(cell, neighbors);
      row.push(newCell);
    }
    newGrid.push(row);
  }
}

const swap = () => {
  grid = newGrid;
  newGrid = [];
}



const frame = () => {
  console.clear();
  render();
  tick();
  swap();
}

const start = () => {
  for (let y = 0; y < columns; y++) {
    const row = [];
    for (let x = 0; x < rows; x++) {
      row.push(0);
    }
    grid.push(row);
  }
}

const makeSpaceShip = (x, y) => {
  grid[y + 0][x + 0] = 0;
  grid[y + 1][x + 0] = 1;
  grid[y + 2][x + 0] = 0;

  grid[y + 0][x + 1] = 0;
  grid[y + 1][x + 1] = 0;
  grid[y + 2][x + 1] = 1;

  grid[y + 0][x + 2] = 1;
  grid[y + 1][x + 2] = 1;
  grid[y + 2][x + 2] = 1;
};

const makeSmallExploder = (x, y) => {
  grid[y + 0][x + 0] = 0;
  grid[y + 1][x + 0] = 1;
  grid[y + 2][x + 0] = 0;

  grid[y + 0][x + 1] = 1;
  grid[y + 1][x + 1] = 1;
  grid[y + 2][x + 1] = 1;

  grid[y + 0][x + 2] = 1;
  grid[y + 1][x + 2] = 0;
  grid[y + 2][x + 2] = 1;

  grid[y + 0][x + 3] = 0;
  grid[y + 1][x + 3] = 1;
  grid[y + 2][x + 3] = 0;
}



start();
makeSpaceShip(1, 1);
makeSmallExploder(20, 10);
frame();
setInterval(frame, 250);








