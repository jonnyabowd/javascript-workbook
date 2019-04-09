'use strict';
// const assert = require('assert');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });


// this is our starting array of people that includes classes of id, name, age, skill set, and place of birth in each
const arrOfPeople = [
    {
      id: 2,
      name: "Charles Young",
      age: 55,
      skillSet: "welding",
      placeBorn: "Omaha, Nebraska"
    },
    {
      id: 3,
      name: "Judy Twilight",
      age: 35,
      skillSet: "fishing",
      placeBorn: "Louisville, Kentucky"
    },
    {
      id: 4,
      name: "Cynthia Doolittle",
      age: 20,
      skillSet: "tic tac toe",
      placeBorn: "Pawnee, Texas"
    },
    {
      id: 5,
      name: "John Willouby",
      age: 28,
      skillSet: "pipe fitting",
      placeBorn: "New York, New York"
    },
    {
      id: 6,
      name: "Stan Honest",
      age: 20,
      skillSet: "boom-a-rang throwing",
      placeBorn: "Perth, Australia"
    },
    {
      id: 7,
      name: "Mia Watu",
      age: 17,
      skillSet: "acrobatics",
      placeBorn: "Los Angeles, California"
    },
    {
      id: 8,
      name: "Walter Cole",
      age: 32,
      skillSet: "jump rope",
      placeBorn: "New Orleans, Louisiana"
    },
  ]

// empty array for the players that have been added to the game
const listOfPlayers = []
// empty array for the blue team players
const blueTeam = []
// empty array for the red team players
const redTeam = []

class player {
constructor(){}
}
class blueTeammate {
constructor(){}
}
class redTeammate {
constructor(){}
}

// this function run when user clicks List People btn and displays the list of people to choose from
const listPeopleChoices = () => {
    // grab the unordered list with the id of 'people' and set equal to var of listElement
    const listElement = document.getElementById('people')
    // take each item in the arrOfPeople array do the following
    arrOfPeople.map(person => {
        // create a list item and set equal to var of li
        // set the id on the list item = to applicant
        const li = document.createElement("li")
        li.setAttribute('id', 'applicant')

        // create a button and set equal to var called button
        // set text on button to Make Player
        // add onClick event that runs the make player function and passes in that person's id
        // add button to the list item
        const button = document.createElement("button")
        button.innerHTML = "Make Player"
        button.addEventListener('click', function() {makePlayer(person.id)} )
        li.appendChild(button)

        // add text that has the person's name and skill set separated by a dash to the list item
        li.appendChild(document.createTextNode(person.name + " - " + person.skillSet))
        
        // no idea what this does. I think it adds the whole list item to the parent unordered list
        listElement.append(li)
    })
    // find the listBtn we clicked that displayed the people and remove this item
    document.getElementById('listBtn').remove(this);
}

// this function runs whenever the Make Player button is clicked
const makePlayer = (id) => {

    console.log(`li ${id} was clicked!`)
    // using the id we passed in, take that person we clicked and push them to the player list array
    listOfPlayers.push(arrOfPeople[id - 2]);
    console.log(arrOfPeople);
    console.log(listOfPlayers);

    // find this list item we clicked using the id and remove this item
    document.getElementById('applicant').remove(this);

    // grab the unordered list with the id of 'players' and set equal to var of listElement
    const listElement = document.getElementById('players')

    // clear the list items in players before we repopulate it with the updated list
    let playerList = document.getElementById('players');
    playerList.innerHTML = '';

    // take each item in the listOfPlayers array do the following
    listOfPlayers.map(person => {
        
        // create a list item and set equal to var of li
        // set the id on the list item = to playable
        const li = document.createElement("li")
        li.setAttribute('id', 'playable')

        // create a button and set equal to var of button
        // set text on button to Make Player
        // add button to the list item
        // add onClick event that runs the make player function and passes in that person's id
        const blueButton = document.createElement("button")
        blueButton.innerHTML = "Add To BLUE Team"
        li.appendChild(blueButton)        
        blueButton.addEventListener('click', function() {addToBlueTeam(person.id)} )

        // create a button and set equal to var of button
        // set text on button to Make Player
        // add button to the list item
        // add onClick event that runs the make player function and passes in that person's id
        const redButton = document.createElement("button")
        redButton.innerHTML = "Add To RED Team"
        li.appendChild(redButton)
        redButton.addEventListener('click', function() {addToRedTeam(person.id)} )

        // add text that has the person's name and skill set separated by a dash to the list item
        li.appendChild(document.createTextNode(person.name + " - " + person.skillSet))

        // no idea what this does. I think it adds the whole list item to the parent unordered list
        listElement.append(li)

    })

}

// this function runs whenever the Add To BLUE Team button is clicked
const addToBlueTeam = (id) => {
    console.log(`make player blue!`)
    // using the id we passed in, take that person we clicked and push them to the player list array
    blueTeam.push(listOfPlayers[id - 2]);
    console.log(listOfPlayers);
    console.log(blueTeam);

    // find this list item we clicked using the id and remove this item
    document.getElementById('playable').remove(this);

    // grab the unordered list with the id of 'players' and set equal to var of listElement
    const listElement = document.getElementById('blue')

    // clear the list items in blue team before we repopulate it with the updated list
    let blueList = document.getElementById('blue');
    blueList.innerHTML = '';

    // take each item in the listOfPlayers array do the following
    blueTeam.map(person => {
        
        // create a list item and set equal to var of li
        const li = document.createElement("li")

        // set the id on the list item = to applicant
        li.setAttribute('id', 'bluePlayer')

        // add text that has the person's name
        li.appendChild(document.createTextNode(person.name))

        // no idea what this does. I think it adds the whole list item to the parent unordered list
        listElement.append(li)

    })
}

// this function runs whenever the Add To RED Team button is clicked
const addToRedTeam = (id) => {
    console.log(`make player red!`)
    // using the id we passed in, take that person we clicked and push them to the player list array
    redTeam.push(listOfPlayers[id - 2]);
    console.log(listOfPlayers);
    console.log(redTeam);

    // find this list item we clicked using the id and remove this item
    document.getElementById('playable').remove(this);

    // grab the unordered list with the id of 'players' and set equal to var of listElement
    const listElement = document.getElementById('red')

    // clear the list items in blue team before we repopulate it with the updated list
    let redList = document.getElementById('red');
    redList.innerHTML = '';

    // take each item in the listOfPlayers array do the following
    redTeam.map(person => {
        
        // create a list item and set equal to var of li
        const li = document.createElement("li")

        // set the id on the list item = to applicant
        li.setAttribute('id', 'redPlayer')

        // add text that has the person's name
        li.appendChild(document.createTextNode(person.name))

        // no idea what this does. I think it adds the whole list item to the parent unordered list
        listElement.append(li)

    })
}


// TESTS

// if (typeof describe === 'function') {

//     describe('makePlayer()', () => {
//         it('convert person to player', () => {
//             let boolean = true;
//             assert.equal(boolean, true);
//         });
//     });

//     describe('addToBlueTeam()', () => {
//         it('add player to blue team', () => {
//             let boolean = true;
//             assert.equal(boolean, true);
//         });
//     });

//     describe('addToRedTeam()', () => {
//         it('add player to blue team', () => {
//             let boolean = true;
//             assert.equal(boolean, true);
//         });
//     });

// }