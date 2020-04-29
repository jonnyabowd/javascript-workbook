'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  // Take the last number in the starting stack .pop and add it to the end of the ending stack .push
  stacks[endStack].push(stacks[startStack].pop())
}

function isLegal(startStack,endStack) {
  // Grab the position of the last numbers in both stacks and assign them to variables
  let startPos = stacks[startStack].length-1;
  let endPos = stacks[endStack].length-1;

  // If the number in the starting position is greater than the number in the ending position it is illegal and return true otherwise the move is legal
  if ((stacks[startStack][startPos] < stacks[endStack][endPos]) || (stacks[endStack][endPos] === undefined)) {
    return true;
  } else {
    return false;
  };
}

function checkForWin() {
  // Check the last stack to see if all 4 numbers are in it. If so announce winner
  if (stacks.c.length === 4){
    console.log("WINNER WINNER CHICKEN DINNER!!!")
  };
}

function towersOfHanoi(startStack,endStack) {
  // If a move is legal, run the movePiece function and checkForWin, otherwise the move is illegal so do not move and prompt to try again
  if (isLegal(startStack,endStack)) {
    movePiece(startStack,endStack);
    checkForWin()
  } else {
    console.log("This move is ILLEGAL! Try again.")
  };
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
