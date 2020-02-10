const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

function randomInteger(min, max) {
    let range = max - min + 1;
    return min + Math.floor(Math.random() * range);
}

function capitalize(word) {
    let steralize = word.toString().trim().toLowerCase()
    let firstLetter = steralize[0].toUpperCase()
    let restOfWord = steralize.slice(1)
    return firstLetter + restOfWord
}
start();

async function start() {
    console.log("Lets play a game where I pick a number, and you get to try to guess what it is!")
    console.log("The only hints you will get are if my number is higher or lower then your guess.")

    // let response = await ask("What do you say, Yes or No? ")
    // response = response.toString().trim()
    // console.log(response)

    // if (response === ''){
    //     console.log(response)

    // }
    // if (capitalize(response).charAt(0) !== "Y") {//Not sure how to fix currently, but putting an empty space returns an error
    //     console.log("That's boring. Come back when you do want to play.")
    //     process.exit()
    // } 

    let hiNum = await ask("So what will the high number be? ")
    hiNum = Math.floor(parseInt(hiNum))

    //defining the lower and higher number and creating a variable for the random integer
    if (isNaN(hiNum)) {
        hiNum = 100
        console.log("That's okay I set the high number to 100 for you")
    }

    let lowNum = 1
    const compNum = randomInteger(lowNum, hiNum)

    console.log(compNum)
    console.log(compNum)
    console.log(compNum)
    console.log("Awesome! I got my number.")
    let humanGuess = await ask("What will your first guess be? ")
    humanGuess = Math.floor(parseInt(humanGuess))

    while (isNaN(humanGuess)) {
        humanGuess = await ask("Could you please try agian?\nWhat will your first number be? ")
        humanGuess = Math.floor(parseInt(humanGuess))
    }

    while (humanGuess > hiNum || humanGuess < lowNum) {
        humanGuess = await ask("Please have your guess between " + lowNum + " and " + hiNum + ".\nWhat will your guess be?")
        humanGuess = Math.floor(parseInt(humanGuess))
            while (isNaN(humanGuess)) {
                humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
                humanGuess = Math.floor(parseInt(humanGuess))
            }
    }

    //here i need to put something that will allow the comp to say if your guess is higher or lower then 
    while (humanGuess !== compNum) {
        if (humanGuess < lowNum) {
            humanGuess = await ask("Please have your guess between " + lowNum + " and " + hiNum + ".\nWhat will your guess be? ")
            humanGuess = Math.floor(parseInt(humanGuess))
                while (isNaN(humanGuess)) {
                    humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
                    humanGuess = Math.floor(parseInt(humanGuess))
                }
        } else if (humanGuess > hiNum) {
            humanGuess = await ask("Please have your guess between " + lowNum + " and " + hiNum + ".\nWhat will your guess be? ")
            humanGuess = Math.floor(parseInt(humanGuess))
                while (isNaN(humanGuess)) {
                    humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
                    humanGuess = Math.floor(parseInt(humanGuess))
                }
        }
        else if (humanGuess < compNum) {
            lowNum = humanGuess
            console.log("You were not right! Your guess was lower then what I picked.")
            humanGuess = await ask("What will your next guess be? ")
            humanGuess = Math.floor(parseInt(humanGuess))
            while (isNaN(humanGuess)) {
                humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
                humanGuess = Math.floor(parseInt(humanGuess))    
            }
            
        } else if (humanGuess > compNum) {
            hiNum = humanGuess
            console.log("That's not right! Your guess was higher then what I picked.")
            humanGuess = await ask("What will your next guess be? ")
            humanGuess = Math.floor(parseInt(humanGuess))
            while (isNaN(humanGuess)) {
                humanGuess = await ask("Could you please try agian?\nWhat will your number be? ")
                humanGuess = Math.floor(parseInt(humanGuess))
            }
        }
    }
    console.log("Congrats! You got it!")
    process.exit();
}

//I could make all of the sanitization of the human guesses into a function.
