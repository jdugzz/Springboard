/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {

  for (let i = 0; i < HEIGHT; i++){ //for loop that runs until board array has 
  let row = new Array(WIDTH).fill(null);
  board.push(row);
  
}
console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board')
  // TODO: add comment for this code
  let top = document.createElement("tr"); //create table row element
  top.setAttribute("id", "column-top"); //set id of element to be 'column-top'
  top.addEventListener("click", handleClick); //add event listener so that event is triggered on click

  for (let x = 0; x < WIDTH; x++) { //create loop to dynamically create table based on width of the board
    let headCell = document.createElement("td"); //create an element to hold data
    headCell.setAttribute("id", x); //give the element an id based on where it is generated in for loop
    top.append(headCell); //put the headCell element inside the 'top' attirbute
  }
  htmlBoard.append(top); //append the new, full top element on the htmlBoard

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { //create loop to dynamically create the table based on height of the board and fill out the board
    const row = document.createElement("tr"); //create table row element
    for (let x = 0; x < WIDTH; x++) { //create for loop to  begin creating the row cells
      const cell = document.createElement("td"); //create table element to hold data
      cell.setAttribute("id", `${y}-${x}`); //set an id based on its unique position within the table 
      row.append(cell); //add the cell element to the row that holds it
    }
    htmlBoard.append(row); //add the row to the table element 
  } //the above code creates the table element cell by cell, row by row
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let piece = document.createElement('div')
  piece.setAttribute('class', 'piece')
  piece.classList.add('p1')
  document.getElementById(`${y}-${x}`).append(piece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// makeBoard();
makeHtmlBoard();
