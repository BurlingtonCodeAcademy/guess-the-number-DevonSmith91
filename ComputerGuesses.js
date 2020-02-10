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

//function for sanatizing responses from input
function capitalize(word) {
  let steralize = word.toString().trim().toLowerCase()
  let firstLetter = steralize[0].toUpperCase()
  let restOfWord = steralize.slice(1)
  return firstLetter + restOfWord
}

// start async function
start();

async function start() {
  //start off with a prompt to play the game.
  console.log("Let's play a game where you make up a number and I try to guess it but I need you to pick the high number")

  // allow the user to put the hi
  let hiNum = await ask("So what will the highest number we can pick be? ")

  // sanatize the user number to be sure its a whole number.
  hiNum = Math.floor(parseInt(hiNum))

  // if the user doesn't input a number, automatically set the max number to 100
  if (isNaN(hiNum)) {
    hiNum = 100
  }

  // define the low number and then use the low and the high to generate a random number for the computers first guess.
  let lowNum = 1
  let randNum = randomInteger(lowNum, hiNum)

  //allow the user to input a number and have it wait for that to happen
  
  let secretNumber = await ask("Pick any number between 1 and " + hiNum + " and let me know what it is.\nI won't peek, I promise...\n");
  secretNumber = Math.floor(parseInt(secretNumber))
  
  while (isNaN(secretNumber)) {
    secretNumber = await ask("That's not a number\nCare to try again? ")
    secretNumber = Math.floor(parseInt(secretNumber))
  }
  //return said secret number and say it will now guess.
  console.log('You entered: ' + secretNumber + "\nNow let me guess!");

  //Get the computer to guess a random number between 1 and the high number the user chose
  console.log(randNum)

  //give a prompt about asking if the guess was correct
  let response = await ask("Was I right?! ")
  
  // this is a while loop that if the answer is not yes, it will keep generating numbers until it's right
  while (capitalize(response).charAt(0) !== "Y") {
  
    // if statement that is for when the user says no (or any word starting with 'n' for that matter, try to figure out fixing this.)
    if (capitalize(response).charAt(0) === "N") {

      //allow the computer to ask if it is higher or lower
      let highOrLow = await ask("Is your number higher or lower? ")

      // while loop so that if the response to higher or lower isnt a proper response, it will tell the player and ask again 
      while (capitalize(highOrLow).charAt(0) !== "H" && capitalize(highOrLow).charAt(0) !== "L") {
        highOrLow = await ask("That is not Higher or Lower please try again.\nWas your number higher or lower? ")
      }

      // if statement that if the response is higher, it will remember and guess appropriately.
      if (capitalize(highOrLow).charAt(0) === "H") { 

        // redefine the low number to restrict the low side of the range.
        lowNum = randNum + 1
       
        // if the high number ends up less then the low number, it will know you cheated during the game.
        if (hiNum < lowNum) {
          console.log("Youre Cheating!")
          // quit the game in spite.
          process.exit()
        }

        // redefine the randNum to account for the new high or low numbers.
        randNum = randomInteger(lowNum, hiNum)
        
        // generate a new number to ask if it's that.
        console.log(randNum)
          
      } 
      // second part of the if statement for if the user says the number is lower.
      else if (capitalize(highOrLow).charAt(0) === "L") {

        // redefine the new high number to help narrow down the selection
        hiNum = randNum - 1  

        // if the high number ends up lower then the low number, it will know you cheated.
        if (hiNum < lowNum) {
            console.log("Youre Cheating!")

            // quit the game in spite.
            process.exit()
          }

        // redefine randNum for creating a new random number using the updated low and high numbers.
        randNum = randomInteger(lowNum, hiNum)

        // create a new number to ask if this one is right
        console.log(randNum)
      }

      // redefine response to continue loop
      response = await ask("What about this one? ")

      // if they input something that is not a Yes or No to the initial question if that was your number.
    } else {
      console.log("That's not an appropriate response.")

      // redefine response to continue loop
      response = await ask("Please try again.\nWas I right? ")
    }


  }
  // if the computer wins, it gloats and quits.
  console.log("I knew it! I'm smarter then you Human!")
  process.exit()
}

// to take this farther, you can optomize the guesses so that instead of them being random. it will take the 
// (high number + low number)/2 = compGuess so that every guess will be in the middle of the selection removing the most
// possibilities per guess.