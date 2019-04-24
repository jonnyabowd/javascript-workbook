

// FIND FACTORIAL

function factorial(x) {

    // termination
    if (x < 0) return;

    // base
    if (x === 0) return 1;

    // recursion
    return x * factorial(x - 1);
}

console.log(factorial(3));
// logs 6




// FIND FIBONACCI

const fib = (n) =>{
    if(n <= 0){
        return 0;
    }if(n === 1){
        return 1;
    }else{
        return fib(n-1) + fib(n-2);
    }
}

console.log(fib(4));


// FIND EXPONENT 
// (8, 2) = 64 (base, exponent)

let expNum = (b,e) => {
    if (e === 0) {
        return 0;
    }else{
        return b * expNum(b,e-1);
    }
}

console.log(expNum(8,2));




// let arr = [1,2,3,4,5,6]
// const sum = (arr) => {
//     if(arr.length == 1){
//         return arr[0];
//     }else{

//     }
// }


//SUM TRIANGLE = add next value in array to previous number
// [1,2,3,4,5]
// [3,5,7,9]
// [8,12,16]
// [20,28]
// [48]

// const sumTrig = (array) => {
//     (array.length === 0) ? 0 : array[0] + sumTrig(array.slice(1));
// }

// console.log(sumTrig([1,2,3,4,5]))

let arr = [1,2,3,4,5]

const sumTri = (arr) => {
    if(arr.length == 1){
        return arr;
    }
    let temp = new Array(arr.length - 1);
    for(let i = 0; i < arr.length -1; i++){
        let x = arr[i] + arr[i+1];
        temp[i] = x;
    }
    return arr + " // " + sumTri(temp)
}
console.log(sumTri(arr));


// Recursive program to generate power set

// let string = "abc"
// "a", "b", "c", "ab", "bc", "ac", "abc"

// NOT A RECURSIVE FUNCTION BUT A WORKING EXAMPLE USING FOR LOOPS
function powerSet(str) {
    let obj = {}
    //This loop is to take out all duplicate number/letter
    for(let i=0;i<str.length; i++){
       obj[str[i]] = true;
    }
    //variable array will have no duplicates
    let array = Object.keys(obj);
    let result = [[]];
    for(let i=0; i<array.length ;i++){
       //this line is crucial! It prevents us from infinite loop
       let len = result.length; 
       for(let x=0; x<len ;x++){
         result.push(result[x].concat(array[i]))
       }
    }
return result;
}
 
let string = 'abc'

console.log(powerSet(string))