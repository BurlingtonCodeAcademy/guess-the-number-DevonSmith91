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


//refrain from nesting if else statements for the entire thing. figure out loops and create loops that will make the
//function be what I want. It will be easier to update later on in the process.

//i need to write a loop that would use a variable that can change.
//there would need to be one variable for the min value and one variable for the max value.
//depending on if i tell the program "higher" or "lower" it would need to be able to replace the appropriate values.

//essentially. learn some loops!