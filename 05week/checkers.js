'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  // this is the method where we are taking in the checker type and coordinates
  constructor(symbol, row, col) {
    this.symbol = symbol;
    this.row = row;
    this.col = col;
    this.isKing = false;
  }
  // if we call the makeKing function convert this.symbol's lowercase r to uppercase else lowercase b to uppercase
  makeKing() {
    if (!this.isKing) {
      this.isKing = true;
      if (this.symbol === "r") {
        this.symbol = "R";
      } else {
        this.symbol = "B";
      }
    }
  }
}


class Board {
  constructor() {
    this.grid = []
    this.checkers = []
  }
  // creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows of null values
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of null values
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // adding column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece)
        if (this.grid[row][column]) {
          // push the symbol of the checker in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  // this function fills the board on initial setup
  createCheckers() {
    // create a for loop and run through every row
    for (let row = 0; row < 8; row++) {
      // create another for loop and run through every column within the row
      for (let col = 0; col < 8; col++) {
        // add the row and col together and use remainder operator (%) to divide by 2 and return the remainder. if there is a remainder of 1 && the row value is less than 3, push an 'r' into that coordinate of the array. 
        if ((row + col) % 2 === 1 && row < 3) {
          const newChecker = new Checker("r", row, col);
          this.grid[row][col] = newChecker;
          this.checkers.push(newChecker);
        } 
        // add the row and col together and use remainder operator (%) to divide by 2 and return the remainder. if there is a remainder of 1 && the row value is less than 4, push a 'b' into that coordinate of the array.
        else if ((row + col) % 2 === 1 && row > 4) {
          const newChecker = new Checker("b", row, col);
          this.grid[row][col] = newChecker;
          this.checkers.push(newChecker);
        } 
        // add the row and col together and use remainder operator (%) to divide by 2 and return the remainder. if there is a remainder of 0 this is a non-playable space. Push a character into that coordinate of the array.        
        else if ((row + col) % 2 === 0) {
          const newChecker = new Checker(String.fromCharCode(0x2733), row, col);
          this.grid[row][col] = newChecker;
          this.checkers.push(newChecker);
        }
      }
    }
  }

  //
  findPiece(coordinate) {
    const row = coordinate[0];
    const col = coordinate[1];
    const currentPiece = this.checkers.find(checker => {
      return checker.row === row && checker.col === col;
    });
    return currentPiece;
  }

  // this function receives the currentPiece coordinates and uses them to set that space on the grid equal to null and removes it from the checkers array
  removePiece(currentPiece) {
    const row = currentPiece.row;
    const col = currentPiece.col;
    this.grid[row][col] = null;
    const index = this.checkers.indexOf(currentPiece);
    this.checkers.splice(index, 1);
  }

  /* 
  this function checks to make sure the move is legal by taking in the current and the destination coordinates then: 
  - making sure the destination space is empty
  - making sure the piece is going in the right direction
  - making sure the piece is going the correct distance (move = 1 or jump = 2) 
  */
  isLegalMove(currentPiece, destination) {
    const newRow = destination[0];
    const newCol = destination[1];
    const oldRow = currentPiece.row;
    const oldCol = currentPiece.col;
    if (this.grid[newRow][newCol]) {
      return false;
    }
    if (currentPiece.symbol === "r" || currentPiece.isKing) {
      if (newRow === oldRow + 1 && (newCol === oldCol + 1 || newCol === oldCol - 1)) {
        return true;
      } else if (newRow === oldRow + 2 && newCol === oldCol + 2 &&
        this.grid[oldRow + 1][oldCol + 1]) {
        this.removePiece(this.grid[oldRow + 1][oldCol + 1]);
        return true;
      } else if (newRow === oldRow + 2 && newCol === oldCol - 2 &&
        this.grid[oldRow + 1][oldCol - 1]) {
        this.removePiece(this.grid[oldRow + 1][oldCol - 1]);
        return true;
      }
    }
    if (currentPiece.symbol === "b" || currentPiece.isKing) {
      if (newRow === oldRow - 1 && (newCol === oldCol + 1 || newCol === oldCol - 1)) {
        return true;
      } else if (newRow === oldRow - 2 && newCol === oldCol + 2 &&
        this.grid[oldRow - 1][oldCol + 1]) {
        this.removePiece(this.grid[oldRow - 1][oldCol + 1]);
        return true;
      } else if (newRow === oldRow - 2 && newCol === oldCol - 2 &&
        this.grid[oldRow - 1][oldCol - 1]) {
        this.removePiece(this.grid[oldRow - 1][oldCol - 1]);
        return true;
      }
    }
    return false;
  }

  // take in the origin and destination coordinates and move the piece
  movePiece(currentPiece, destination) {
    const newRow = destination[0];
    const newCol = destination[1];
    const oldRow = currentPiece.row;
    const oldCol = currentPiece.col;
    // in the grid find the new space and set it equal to the currentPiece and set the old space equal to null
    this.grid[newRow][newCol] = currentPiece;
    this.grid[oldRow][oldCol] = null;
    currentPiece.row = newRow;
    currentPiece.col = newCol;
    // once a piece is moved to either the very top or very bottom row run the makeKing function on the currentPiece
    if (newRow === 7 || newRow === 0) {
      currentPiece.makeKing();
    }
  }

  // this function checks for win by searching the entire checkers array to see if it contains at least one piece from either player
  checkForWin() {
    const containAnR = this.checkers.some(checker => {
      return checker.symbol === "r" || checker.symbol === "R";
    });
    if (!containAnR) {
      console.log("RED Wins!");
      return true;
    }
    const containAnB = this.checkers.some(checker => {
      return checker.symbol === "b" || checker.symbol === "B";
    });
    if (!containAnB) {
      console.log("BLACK Wins!");
      return true;
    }
    return false;
  }
}


class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }

  // this function takes in the whichPiece and toWhere inputs
  moveChecker(whichPiece, toWhere) {
    // run the parseInput function on each input to check for valid 0-7 values
    const origin = this.parseInput(whichPiece);
    const destination = this.parseInput(toWhere);
    // if either returned null tell them they stupid and try again
    if (!origin || !destination) {
      console.log("You silly! That is not a valid board location. Try again!");
      return null;
    }
    // make sure they actually selected one of their pieces. Pass the origin array into the findPiece function
    const currentPiece = this.board.findPiece(origin);
    if (!currentPiece) {
      console.log("No checker selected. Try again!");
      return null;
    }
    // run the isLegalMove function and pass in currentPiece and destination coordinates
    const isLegalMove = this.board.isLegalMove(currentPiece, destination);
    if (!isLegalMove) {
      console.log("Not a legal move! Try again!");
      return null;
    } else {
      this.board.movePiece(currentPiece, destination);
    }
  }

  // take the string input, return as integers, and makes sure they are valid 0-7 values
  parseInput(string) {
    const row = parseInt(string[0]);
    const col = parseInt(string[1]);
    const validInputs = [0, 1, 2, 3, 4, 5, 6, 7];
    // if the row OR the col inputs to NOT include one of the valid inputs, return null
    if (!validInputs.includes(row) || !validInputs.includes(col)) {
      return null;
    }
    // return the input as an array
    return [row, col];
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
// call the start function which will run the createGrid and createCheckers functions
game.start();













// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}

/* 
-create the board dimensions
-lay all pieces on the board
-be able to move pieces
-be able to kill another piece
*/