'use strict'

window.onload = function() {
    getApi();
};
document.getElementById('fetchUser').addEventListener('click', getApi);


function getApi(){
    console.log('getApi function called');
    fetch('https://randomuser.me/api/?results=5')
    .then(res => res.json())
    .then((data) => {

        // console.log(data.results);

        let userArray = [];

        let output = '';

        data.results.forEach(element => {

            userArray.push(element);

            output += `
            <div>
                <img src="${element.picture.large}">

                <p>Name: ${element.name.first} ${element.name.last}</p>

                <button id="toggleInfo">Toggle info</button>

                <ul id="details" class="info">
                    <li>Age: ${element.dob.age}</li>
                </ul>

                <hr>
            </div>
            `

        });

        document.getElementById('userDiv').innerHTML = output;
        
        document.getElementById('toggleInfo').addEventListener('click', toggleContent);

        console.log(userArray);

    })
}


// create a separate function for hiding the button and call it just like we are calling the getApi function


function toggleContent(){
    console.log('toggle function ran');

    document.getElementById('details').style.visibility = 'hidden';

}
