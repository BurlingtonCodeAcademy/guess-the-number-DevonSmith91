const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//function for generating a random integer
function randomInteger(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}
//function for steralizing responses from input
function capitalize(word) {
  let steralize = word.toString().trim().toLowerCase()
  let firstLetter = steralize[0].toUpperCase()
  let restOfWord = steralize.slice(1)
  return firstLetter + restOfWord
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("Pick any number between 1 and 100 and let me know what it is.\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber + "\nNow let me guess!");
  //Get the computer to guess a random number between 1 and 100
  console.log(randomInteger(1, 100))
  //give a prompt about asking if the guess was correct
  let response = await ask("Was I right?! ")
  if (capitalize(response).charAt(0) === "Y") {
    console.log("I knew it!")
  //or if it was an incorrect guess 
  } else if (capitalize(response).charAt(0) === "N") {
    console.log("I NEED TO GUESS AGAIN!")
  //or if they input something that is not a Yes or No
  } else {
    console.log("That's not an appropriate response.")
  }
  process.exit();
}
