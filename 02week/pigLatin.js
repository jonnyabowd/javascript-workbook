'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function pigLatin(a) {

  //your code here
  a = a.toLowerCase().trim();
  // convert word to array
  const splitWord = a.split("");

  //take vowels and see if first letter in array includes any
  if(["a","e","i","o","u"].includes(splitWord[0])){
    //if first letter includes a vowel run the following code
    console.log("\"" + a + "\"" + " begins with a vowel!");
    console.log("The way to say this in Pig Latin is:");
    //log joined array into a single string and add 'ay' to the end
    console.log("\"" + splitWord.join('') + "yay" + "\"");
  } else {
    //first letter DOES NOT include a vowel run the following code
    console.log("\"" + a + "\"" + " does NOT start with a vowel!");
    console.log("The way to say this in Pig Latin is:");
    //begin 'for loop' to cycle through characters/array until we hit a vowel
    for (let i = 0; i < splitWord.length; i++){

        //add (push) first letter in array[0] to end of array
        splitWord.push(splitWord[0]);

        //remove first letter (shift) in the array
        splitWord.shift();

      //if we hit a vowel as we're cycling
      if (["a","e","i","o","u"].includes(splitWord[0])){
        //log joined array into a single string and add 'ay' to the end
        console.log("\"" + splitWord.join('') + "ay" + "\"");
        //then break out of the 'for loop'
        break;
      }

    }
  
  }
}

function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
