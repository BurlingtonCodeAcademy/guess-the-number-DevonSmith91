// readline function
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}
// random number generator funciton
function randomInteger(min, max) {
    let range = max - min + 1;
    return min + Math.floor(Math.random() * range);
}
// start of the async function
start();

async function start() {
    // computer promt explaining the game
    console.log("Lets play a game where I pick a number, and you get to try to guess what it is!")
    console.log("The only hints you will get are if my number is higher or lower then your guess.") 
    // this will allow the human to put the high number for the game
    let hiNum = await ask("So what will the highest number I can pick be? ")
    // sanitize response for high number
    hiNum = Math.floor(parseInt(hiNum))

    // one step farther in sanitizing the input, if user puts in anything that's not a number it will auto set to 100
    if (isNaN(hiNum)) {
        hiNum = 100
        console.log("That's okay I set the high number to 100 for you")
    }
    // setting the low number
    let lowNum = 1

    // create the ranom number for the computer to store. Using a const so that it will never change through the program on accident
    const compNum = randomInteger(lowNum, hiNum)
    
    // have the computer state that it has its number and allow the user to make it's first guess
    console.log("Awesome! I got my number.")
    let humanGuess = await ask("What will your first guess be? ")
    
    // sanitize users number to be sure that it's a number, if not ask for the number again
    humanGuess = Math.floor(parseInt(humanGuess))
    while (isNaN(humanGuess)) {
        humanGuess = await ask("Could you please try agian?\nWhat will your first number be? ")
    
        // sanatize new number
        humanGuess = Math.floor(parseInt(humanGuess))
    }
    
    // create a loop that if the user inputs something outside of the range of numbers, it's asked to try again. then sanatize said number
    while (humanGuess > hiNum || humanGuess < lowNum) {
        humanGuess = await ask("Please have your guess between " + lowNum + " and " + hiNum + ".\nWhat will your guess be?")
        humanGuess = Math.floor(parseInt(humanGuess))
    
            // a loop that if the number isnt a numnber, it will try to get a number.
            while (isNaN(humanGuess)) {
                humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
        
                // sanatize new number
                humanGuess = Math.floor(parseInt(humanGuess))
            }
    }

    // create a while loop that if the humans guess isnt = to the comp number, it will ask the human to guess again. 
    while (humanGuess !== compNum) {
        
        // an if statement that during the process. if the human guesses lower then or = to a number already guessed. 
        // it will let them know and tell them to try again
        if (humanGuess <= lowNum) {
            humanGuess = await ask("You have already guessed higher then that and was told it was to low, Please guess again. ")
        
            // sanitize said number
            humanGuess = Math.floor(parseInt(humanGuess))
        
                // a loop that if it isnt a number, it will ask again for a number
                while (isNaN(humanGuess)) {
                    humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
            
                    // sanatize new number
                    humanGuess = Math.floor(parseInt(humanGuess))
                }
        
        // the second part of the if statement where if the user guesses higher then or = to a number already guessed.
        // it will let them know and tell them to try again
        } else if (humanGuess >= hiNum) {
            humanGuess = await ask("You have already guessed lower then that and told it was to high then that. Please guess again. ")

            // sanatize user number
            humanGuess = Math.floor(parseInt(humanGuess))

                // a loop that if user number isnt a number, it will ask the user to try again.
                while (isNaN(humanGuess)) {
                    humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
    
                    // sanatize new number
                    humanGuess = Math.floor(parseInt(humanGuess))
                }
        }
        // an if statement that comapres the human number to the computer guess, if the guess is less then the number it will
        // prompt the user to guess again while telling the user their guess was to low
        else if (humanGuess < compNum) {
    
            // redefine the low number so that when the user puts in future numbers, it will know if their guess is 
            // lower then a previous guess
            lowNum = humanGuess
    
            // let the user know they were wrong and that their guess was lower then the comps number
            console.log("You were not right! Your guess was lower then what I picked.")
    
            // prompt user with a second option to guess
            humanGuess = await ask("What will your next guess be? ")
    
            // sanatize users guess
            humanGuess = Math.floor(parseInt(humanGuess))
    
            // a loop that if the guess isnt a number, it will ask again
            while (isNaN(humanGuess)) {
                humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
    
                // sanatize new number
                humanGuess = Math.floor(parseInt(humanGuess))    
            }
    
            //second part of the if statement for if the human's guess is higher then the computer number
        } else if (humanGuess > compNum) {
    
            // redefine the high number so that when the user puts in future numbers, it will know if their guess is 
            // higher then a previous guess 
            hiNum = humanGuess
    
            // let the user know their guess was wrong and that the their guess was higher then what the computer picked
            console.log("That's not right! Your guess was higher then what I picked.")
    
            // prompt the user to ask for a new number
            humanGuess = await ask("What will your next guess be? ")
    
            // sanatize users number
            humanGuess = Math.floor(parseInt(humanGuess))
    
            // a loop that if the users number isnt a number it will ask the user to put a number in
            while (isNaN(humanGuess)) {
                humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
    
                // sanatize new number
                humanGuess = Math.floor(parseInt(humanGuess))
            }
        }
    }
    // If the user wins, congradulate them on their victory
    console.log("Congrats! You got it!")
    
    // end game
    process.exit();
}

//I could make all of the sanitization of the human guesses into a function to make everything less redundant and neater.
// also it would remove a lot of lines of code as well as a lot of lines of notes.
