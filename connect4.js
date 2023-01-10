
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 'one'; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {// for loop that runs until board array has 
    const row = new Array(WIDTH).fill(null);
    board.push(row);
  }
}

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');
  const top = document.createElement('tr'); // create table row element
  top.setAttribute('id', 'column-top'); // set id of element to be 'column-top'
  top.addEventListener('click', handleClick); // add event listener so that event is triggered on click

  for (let x = 0; x < WIDTH; x++) { // create loop to dynamically create table based on width
    const headCell = document.createElement('td'); // create an element to hold data
    headCell.setAttribute('id', x); // give the element an id based on where it is generated in for loop
    top.append(headCell); // put the headCell element inside the 'top' attirbute
  }
  htmlBoard.append(top); // append the new, full top element on the htmlBoard 
  for (let y = 0; y < HEIGHT; y++) { // create loop to create the table based on height and populate
    const row = document.createElement('tr'); // create table row element
    for (let x = 0; x < WIDTH; x++) { // create for loop to  begin creating the row cells
      const cell = document.createElement('td'); // create table element to hold data
      cell.setAttribute('id', `${y}-${x}`); // set an id based on its unique position within the table 
      row.append(cell); // add the cell element to the row that holds it
    }
    htmlBoard.append(row); // add the row to the table element 
  } // the above code creates the table element cell by cell, row by row
}

function findSpotForCol(x) {
  for (let i = 5; i >= 0; i--) {
    if (board[i][x] === null) {
      board[i].splice(x, 1, currPlayer);
      return i;
    }
  }
}

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.setAttribute('class', 'piece');
  piece.classList.add(`${currPlayer}`);
  document.getElementById(`${y}-${x}`).append(piece);
}

function endGame(msg) {
  alert(msg);
}

function checkForTie() {
  let topRow = board[0];
  if (topRow.every(v => v !== null)) {
    alert('Tie Game!')
  }
}

function handleClick(evt) {
  const x = +evt.target.id;

  const y = findSpotForCol(x);
  placeInTable(y, x);

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  checkForTie(board);

  currPlayer = playerCheck(currPlayer);
}

function checkForWin() {
  function win(cells) {
     return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) { // runs a for loop on every y coord
    for (let x = 0; x < WIDTH; x++) { // runs a for loop on every x coord
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // checks horz. r. for ply pc
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // checks vert. r. for ply pc
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // checks dr r for pc
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // checks dr r for pc

      if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
        return true;
      }
    }
  }
}

function playerCheck(plyr) {
  if (plyr === 'one') {
    return plyr = 'two'
}
  else if (plyr === 'two') {
    return plyr = 'one' 
}
  return true
}
makeBoard();
makeHtmlBoard();
