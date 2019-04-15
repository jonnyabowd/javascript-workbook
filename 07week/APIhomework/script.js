'use strict';

fetch('https:jsonplaceholder.typicode.com/users')
.then(function (response) {
    return response.json()
})
.then(function (data) {
    console.log('placeholder API data', data)
})

// COULD NOT GET THIS API WORKING
// fetch('https://catfact.ninja/facts?limit=1&max_length=140')
// .then(function (response) {
//     return response.json()
// })
// .then(function (data) {
//     console.log('catfact API data', data)
// })

// COULD NOT GET THIS API WORKING EITHER
// fetch('https://cat-fact.herokuapp.com/fact')
// .then(function (response) {
//     return response.json()
// })
// .then(function (data) {
//     console.log('RandomCat API data', data)
// })



window.onload = function() {
    getCat();
    getDog();
};

// document.getElementById('likeDog').addEventListener('click', getDog);



function getCat() {
    fetch('https://aws.random.cat/meow')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log('Random Cat API data', data);

        document.getElementById('catDiv').innerHTML = `<div class="image">
                        <img src="${data.file}">
                      </div>
                      <button id="likeCat">Dis Kitty Mo Betta</button>
                      `;

        document.getElementById('likeCat').addEventListener('click', getDog);
    })

}


function getDog() {
    fetch('https://random.dog/woof.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log('Random Dog API data', data);

        document.getElementById('dogDiv').innerHTML = `<div class="image">
                        <img src="${data.url}">
                      </div>
                      <button id="likeDog">Dis Doggo Mo Betta</button>
                      `;

        document.getElementById('likeDog').addEventListener('click', getCat);
    })

}

