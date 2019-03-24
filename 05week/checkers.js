'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  // Your code here
  constructor(color) {
    if (color === 'red') {
      this.symbol = 'R'
      // this.symbol = String.fromCharCode(0x25CB);
    } else if (color === 'noPlay') {
      this.symbol = String.fromCharCode(0x2733);
    } else {
      this.symbol = 'B'
      // this.symbol = String.fromCharCode(0x25CF);
    }
  }
}

// ORIGINAL BOARD CLASS CODE BELOW FOR WHEN YOU SCREW SOMETHING UP
// class Board {
//   constructor() {
//     this.grid = []
//   }
//   // method that creates an 8x8 array, filled with null values
//   createGrid() {
//     // loop to create the 8 rows
//     for (let row = 0; row < 8; row++) {
//       this.grid[row] = [];
//       // push in 8 columns of nulls
//       for (let column = 0; column < 8; column++) {
//         this.grid[row].push(null);
//       }
//     }
//   }
//   viewGrid() {
//     // add our column numbers
//     let string = "  0 1 2 3 4 5 6 7\n";
//     for (let row = 0; row < 8; row++) {
//       // we start with our row number in our array
//       const rowOfCheckers = [row];
//       // a loop within a loop
//       for (let column = 0; column < 8; column++) {
//         // if the location is "truthy" (contains a checker piece, in this case)
//         if (this.grid[row][column]) {
//           // push the symbol of the check in that location into the array
//           rowOfCheckers.push(this.grid[row][column].symbol);
//         } else {
//           // just push in a blank space
//           rowOfCheckers.push(' ');
//         }
//       }
//       // join the rowOfCheckers array to a string, separated by a space
//       string += rowOfCheckers.join(' ');
//       // add a 'new line'
//       string += "\n";
//     }
//     console.log(string);
//   }

//   // Your code here
// }

class Board {
  constructor() {
    this.checkers = [];
    this.grid = [];
  }

  setBoard() {

    // create a variable equal to an array inside an array with all the red pieces in their starting positions
    let redPositions = [
      [0, 1], [0, 3], [0, 5], [0, 7],
      [1, 0], [1, 2], [1, 4], [1, 6],
      [2, 1], [2, 3], [2, 5], [2, 7]
    ];

    for (let i =0; i < 12; i++) {
      let redRow = redPositions[i][0];
      let redColumn = redPositions[i][1];
      let red = new Checker('red');
      this.checkers.push(red);
      this.grid[redRow][redColumn] = red;
    };

    // create a variable equal to an array inside an array with all the black pieces in their starting positions
    let blackPositions = [
      [5, 0], [5, 2], [5, 4], [5, 6],
      [6, 1], [6, 3], [6, 5], [6, 7],
      [7, 0], [7, 2], [7, 4], [7, 6]
    ];

    for (let i =0; i < 12; i++) {
      let blackRow = blackPositions[i][0];
      let blackColumn = blackPositions[i][1];
      let black = new Checker('black');
      this.checkers.push(black);
      this.grid[blackRow][blackColumn] = black;
    };

    // create a variable equal to an array inside an array with all the places on the board users cannot play
    let noPlaySpaces = [
      [0, 0], [0, 2], [0, 4], [0, 6],
      [1, 1], [1, 3], [1, 5], [1, 7],
      [2, 0], [2, 2], [2, 4], [2, 6],
      [3, 1], [3, 3], [3, 5], [3, 7],
      [4, 0], [4, 2], [4, 4], [4, 6],
      [5, 1], [5, 3], [5, 5], [5, 7],
      [6, 0], [6, 2], [6, 4], [6, 6],
      [7, 1], [7, 3], [7, 5], [7, 7],
    ];

    for (let i =0; i < 32; i++) {
      let noPlayRow = noPlaySpaces[i][0];
      let noPlayColumn = noPlaySpaces[i][1];
      let noPlay = new Checker('noPlay');
      this.checkers.push(noPlay);
      this.grid[noPlayRow][noPlayColumn] = noPlay;
    };

  }

  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
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

  // // ATTEMPT TO MANUALLY SET BOARD PIECES
  // setBoard() {

  //   this.grid[0,0] = [null,'R',null,'R',null,'R',null,'R'];
  //   this.grid[0,1] = ['R',null,'R',null,'R',null,'R',null];
  //   this.grid[0,2] = [null,'R',null,'R',null,'R',null,'R'];

  //   console.log(this.grid);
    
  //   // for (let row = 0; row < 8; row++) {
  //   //   if (this.grid[row] % 2 === 0) {
  //   //     rowOfCheckers.push('+');
  //   //   }
  //   // }
  // }
}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.setBoard();
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
game.start();


/*
CHECKERS LOGIC
- At start of game create 8x8 board
  - Use a for loop to create a row array with 8 spaces
  - Alternate placing a '+' and null in each space
    - Create a const to hold if row should start with '+' and set it to true
    - Start with an '+' if true, else start with null and iterate through the rest of the loop
  - Create a for loop to run the row for loop 8 times to create 8 rows stacked on top of each other

- Add row and column labels
  - Create a row of 8 column numbers (0-7) separated by spaces (as a string)
    - Add a space first to account for the following first column of row labels
  - Using 2 for loops, create 8 additional rows with one row label followed by 8 open columns separated by spaces
  - Use the first for loop to enter the row number then run the second for loop

- Push the correct pieces and spaces to the board
  -
*/


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
