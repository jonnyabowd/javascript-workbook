'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {

  // First command will check all HORIZONTAL rows to see if each space in a row contains the current playerTurn
  if (
    (board[0][0] == playerTurn && board[0][1] == playerTurn && board[0][2] == playerTurn) ||
    (board[0][0] == playerTurn && board[0][1] == playerTurn && board[0][2] == playerTurn) ||
    (board[0][0] == playerTurn && board[0][1] == playerTurn && board[0][2] == playerTurn)
  ) {

    // Return true if one of the rows has all the players moves in it
    return true;
  } else {

    // Return false if one of the rows has all the players moves in it
    return false;
  }
}

function verticalWin() {

  // First command will check all VERTICAL columns to see if each space in a column contains the current playerTurn
  if (
    (board[0][0] == playerTurn && board[1][0] == playerTurn && board[2][0] == playerTurn) ||
    (board[0][1] == playerTurn && board[1][1] == playerTurn && board[2][1] == playerTurn) ||
    (board[0][2] == playerTurn && board[1][2] == playerTurn && board[2][2] == playerTurn)
  ) {

    // Return true if one of the columns has all the players moves in it
    return true;
  } else {

    // Return false if one of the columns has all the players moves in it
    return false;
  }
}

function diagonalWin() {

  // First command will check both DIAGONALS to see if each space contains the current playerTurn
  if (
    (board[0][0] == playerTurn && board[1][1] == playerTurn && board[2][2] == playerTurn) ||
    (board[0][2] == playerTurn && board[1][1] == playerTurn && board[2][0] == playerTurn)
  ) {

    // Return true if one of the diagonals has all the players moves in it
    return true;
  } else {

    // Return false if one of the diagonals does not have all the players moves in it
    return false;
  }

}

function checkForWin() {

  // First command will check if horizontal vertical or diagonal functions returned a true
  if (horizontalWin() || verticalWin() || diagonalWin()) {

    // If they return a true show which player it was and say they won
    console.log(playerTurn + ", you won!");
    return true;
  } else {

    // If they return a false the board is full and no one won
    console.log("It's a tie, no winners!");
    return false;
  }
}

function ticTacToe(row, column) {

  // First command will take the selected row and column in the array and set it to whichever player selected
  board[row][column] = playerTurn;

  // Second command will run the cockForWin function
  checkForWin();

  // Third command will check if the player is X
  if (playerTurn === 'X'){

    // If it is 'X' it will switch playerTurn to 'O'
    playerTurn = 'O'
  } else {

    // If it is not 'X' it will switch playerTurn to 'X'
    playerTurn = 'X'
  }
}

// The game starts by running this function
function getPrompt() {

  // First command will show the current board
  printBoard();

  // Second command will show which players turn it is
  console.log("It's Player " + playerTurn + "'s turn.");

  // Third command will ask player which ROW they want to place in
  rl.question('row: ', (row) => {

    // Fourth command will ask player which COLUMN they want to place in
    rl.question('column: ', (column) => {

      // Fifth command will call the ticTacToe function and pass the players row and column placement
      ticTacToe(row, column);

      // Sixth command will call this entire function again from the top
      getPrompt();
    });
  });
}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
