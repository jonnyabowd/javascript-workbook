"use strict"

// Write a JavaScript program to display the current day and time.
var date = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
console.log(date);

// Write a JavaScript program to convert a number to a string.
var number = 4;
var numberString = number.toString();
console.log(typeof numberString);

// Write a JavaScript program to convert a string to the number.
var text = '123';
var integer = parseInt(text, 10);
console.log(typeof integer);

// Write a JavaScript program that takes in different datatypes and prints out whether they are a: Boolean, Null, Undefined, Number, NaN, String
var dataType = true;
console.log(typeof dataType);

// Write a JavaScript program that adds 2 numbers together.
function addition(num1, num2){
  return(num1 + num2);
}
console.log(addition(8274,4852));

function subtraction(num1, num2){
  return(num1 - num2);
}
console.log(subtraction(500,194));

// Write a JavaScript program that runs only when 2 things are true.
let x = 2;
let y = 6;
if(x < 5 && y > 4){
  console.log("when 2 things are true");
}

// Write a JavaScript program that runs when 1 of 2 things are true.
let a = 2;
let b = 3;
if(a < 5 || b > 4){
  console.log("when 1 of 2 things are true"); 
}

// Write a JavaScript program that runs when both things are not true.
let c = 2;
let d = 6;
if((c != 5) && (d != 4)){
  console.log("when both things are true");  
}