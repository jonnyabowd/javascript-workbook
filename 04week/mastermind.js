'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {

  console.log('--GAME BOARD--');
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  };
  console.log('--------------');

}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {

  // take the solution STRING that is passed in, split it into an ARRAY and assign it to solutionArray
  var solutionArray = solution.split('');

  // take the guess STRING that is passed in, split it into an ARRAY and assign it to guessArray
  var guessArray = guess.split('');


  // create a variable to hold how many correct letter LOCATIONS there are
  var correctLetterLocations = 0;

  // use a for loop to cycle through the length of the solution 
  for (let i = 0; i < solutionArray.length; i++) {

    // as the for loop cycles, if the character in the corresponding spaces of both the solution and guess arrays matches
    if (solutionArray[i] === guessArray[i]) {

      // increment the number of correct letters by 1
      correctLetterLocations = correctLetterLocations + 1;

      // and set that space in the solutionArray to null
      solutionArray[i] = null;
    };
  };

  // create a variable to hold how many correct LETTERS there are
  var correctLetters = 0;

  // use a for loop to cycle through the length of the solution
  for (let i = 0; i < solutionArray.length; i++) {
    
    // as the loop cycles, create a variable and assign it to the current character in the solutionArray so we can compare
    var targetIndex = solutionArray[i];

    // take that character we assigned and see if it appears in the entire guessArray using .indexOf
    if (guessArray.indexOf(targetIndex) > -1) {

      // if it does appear, increment correct letters by 1
      correctLetters = correctLetters + 1;

      // and set that space in the solutionArray to null
      solutionArray[i] = null;
    };

  };

  // take the guess entered and the correct location/letter counts and add/push them to the board array
  board.push(guess + ': ' + correctLetterLocations + '-' + correctLetters);
}

function mastermind(solution, guess) {
  // solution = 'abcd'; // Comment this out to generate a random solution

  // take the solution and guess that is passed into this function and compare them
  // if the solution is equal to the guess tell the user they've won
  if (solution === guess) {
    console.log('You guessed it!');
    console.log('');

    // reset the board
    board = [];

    // NEED TO FIGURE OUT HOW TO RESET THE GAME AFTER CORRECT GUESS
    // solution = '';
    // generateSolution();

  } else {

    // else run the generateHint function and pass in the solution and guess arguments
    generateHint(solution, guess);

    // if the guesses on the board are greater than 9 (10 total) the player has failed now let's tell them how much of a failure they are in life
    if (board.length > 9) {
      console.log('YOU HAVE FAILED!!!');
      console.log('The solution was: ' + solution);
      console.log('');

      // reset the board
      board = [];

      // NEED TO FIGURE OUT HOW TO RESET THE GAME AFTER FAIL
      // solution = '';
      // generateSolution();

    } else {

      // otherwise prompt them to guess again
      console.log('GUESS AGAIN!!!');
      console.log('');
    };
  };
}


function getPrompt() {

  // prompt a question that takes the user's guess and passes it into the following function
  rl.question('guess: ', (guess) => {

    // run the mastermind function and pass in the solution and the guess the user just entered
    mastermind(solution, guess);

    // run the printBoard function
    printBoard();

    // rerun this getPrompt function from the top
    getPrompt();
  });
}

















// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
