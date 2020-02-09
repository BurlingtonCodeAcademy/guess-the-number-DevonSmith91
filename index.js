//info for readline ask await functions and async functions
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
  //start off with a prompt to play the game.
  console.log("Let's play a game where you make up a number and I try to guess it but I need you to pick the high number")
  //This works, for the most part. it's off by 1 on the high end. and not plugging a number in throws off the high number later on for 
  //low and high functionality

  let hiNum = await ask("So what will it be? ")
  hiNum = Math.floor(parseInt(hiNum))

  //defining the lower and higher number and creating a variable for the random integer
  if (isNaN(hiNum)) {
    hiNum = 100
  }

  let lowNum = 1
  let randNum = randomInteger(lowNum, hiNum)
  //allow the user to input a number and have it wait for that to happen
  let secretNumber = await ask("Pick any number between 1 and " + hiNum + " and let me know what it is.\nI won't peek, I promise...\n");

  //return said secret number and say it will now guess.
  console.log('You entered: ' + secretNumber + "\nNow let me guess!");

  //Get the computer to guess a random number between 1 and 100

  console.log(randNum)

  //give a prompt about asking if the guess was correct
  let response = await ask("Was I right?! ")
  while (capitalize(response).charAt(0) !== "Y") {
    if (capitalize(response).charAt(0) === "N") {
      //allow the computer to ask if it is higher or lower
      let highOrLow = await ask("Is your number higher or lower? ")
      while (capitalize(highOrLow).charAt(0) !== "H" && capitalize(highOrLow).charAt(0) !== "L") {
        highOrLow = await ask("That is not Higher or Lower please try again.\nWas your number higher or lower? ")
      }
      if (capitalize(highOrLow).charAt(0) === "H") { //if higher, guess a higher number
        lowNum = randNum + 1
        if (hiNum < lowNum) {
          console.log("Youre Cheating!")
          process.exit()
        }
        //at this point i need to create a console.log that will spit out a new random number using the current ranNum as the low number
        randNum = randomInteger(lowNum, hiNum)
        console.log(randNum)
        //if lower, guess a lower number  
      } else if (capitalize(highOrLow).charAt(0) === "L") {
        hiNum = randNum - 1  
        if (hiNum < lowNum) {
            console.log("Youre Cheating!")
            process.exit()
          }
        //creatue a console.log that will spit out a random number using the old random number as the higher number.
        randNum = randomInteger(lowNum, hiNum)
        console.log(randNum)
      }
      //redefine response to continue loop
      response = await ask("What about this one? ")
      //or if they input something that is not a Yes or No
    } else {
      console.log("That's not an appropriate response.")
      //redefine response to continue loop
      response = await ask("Please try again.\nWas I right? ")
    }


  }
  console.log("I knew it! I'm smarter then you Human!")
  process.exit()
}


//refrain from nesting if else statements for the entire thing. figure out loops and create loops that will make the
//function be what I want. It will be easier to update later on in the process.

//i need to write a loop that would use a variable that can change.
//there would need to be one variable for the min value and one variable for the max value.
//depending on if i tell the program "higher" or "lower" it would need to be able to replace the appropriate values.

//essentially. learn some loops!

//instead of worrying about the random number part, focus on getting it to loop until i enter yes

//when game is launched, create a ask await where user will state a number. number will become hiNum for all plugins. run game rest of way