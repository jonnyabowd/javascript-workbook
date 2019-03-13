'use strict';


//access the document and grab the translate button
var translateBtn = document.getElementById('runTranslate');

//when the translate button is clicked, run the pigLatin function
translateBtn.onclick = pigLatin;

//access the document and grab the spot for the end translation
var translation = document.getElementById('translation');




function pigLatin() {

  //first, grab the word that is in the input and set it to = a
  let a = document.getElementById('translateInput').value;

  //make the word all lowercase and remove any spaces before or after
  a = a.toLowerCase().trim();

  // convert word to array
  const splitWord = a.split("");

  //take vowels and see if first letter in array includes any
  if(["a","e","i","o","u"].includes(splitWord[0])){

    //if first letter includes a vowel run the following code
    console.log("\"" + a + "\"" + " begins with a vowel!");

    //change the text on the translation H2 to: joined array into a single string and add 'yay' to the end
    translation.innerHTML = ("\"" + splitWord.join('') + "yay" + "\"");

  } else {

    //first letter DOES NOT include a vowel run the following code
    console.log("\"" + a + "\"" + " does NOT begin with a vowel!");

    //begin 'for loop' to cycle through characters/array until we hit a vowel
    for (let i = 0; i < splitWord.length; i++){

        //add (push) first letter in array[0] to end of array
        splitWord.push(splitWord[0]);

        //remove first letter (shift) in the array
        splitWord.shift();

      //if we hit a vowel as we're cycling
      if (["a","e","i","o","u"].includes(splitWord[0])){

        //change the text on the translation H2 to: joined array into a single string and add 'ay' to the end
        translation.innerHTML = ("\"" + splitWord.join('') + "ay" + "\"");

        //break out of for loop
        break;

      }

    }
  
  }
}


