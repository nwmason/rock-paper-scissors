//  Slight preference to scissors because Anime watchers are 3.5x more likely to select scissors
function getComputerChoice() {
    let choice = Math.random();

    if (choice <= 0.4) {
        return 'scissors';
    } else if (choice <= 0.7) {
        return 'rock';
    } else {
        return 'paper';
    }
}

//  UI makes this code redundant, commenting out in case it's needed later in development
// function getPlayerChoice() {
//     let choice = prompt('Rock, Paper, or Scissors?').toLowerCase().trim()

//     if (choice.includes('rock')) {
//         return choice
//     } else if (choice.includes('scissors')) {
//         return choice
//     } else if (choice.includes('paper')) {
//         return choice
//     } else {
//         return choice
//     }
// }

function incrementPlayerScore() {

}

function incrementComputerScore() {

}

//  game logic, determining who is a winner and who is a loser for the round
function playRound(playerChoice, computerChoice) {
    computerChoice = getComputerChoice();
    console.log("round started, player chose " + playerChoice + "\ncomputer chose " + computerChoice);

    const container = document.querySelector(".content");
    const selector = document.querySelectorAll(".selector");

    for (let i = 0; i < selector.length; i++) {
        selector[i].setAttribute("id", "fadeOut");
        selector[i].addEventListener("transitionend", () => {
            selector[i].remove();
            if (i === 2) {
                const computerContainer = document.createElement("div");
                const computerText = document.createElement("div");
                const computerImg = document.createElement("img");
                computerContainer.setAttribute("class", "container computerSelection");
                computerImg.src = "img/c-icon.png";
                computerImg.alt = "An icon depicting a robot";
                computerImg.setAttribute("class", "computerImg");
                computerText.setAttribute("class", "computerText");
                computerText.textContent = "the computer selects:";

                container.appendChild(computerContainer);
                computerContainer.appendChild(computerImg);
                computerContainer.appendChild(computerText);

                // I have literally zero idea how or why this works
                // all i wanted was the computer choice to fade in
                //instead it kept popping in, I've been messing with this
                // for like 2 hours
                //finally gave in and checked stack overflow, im not going down
                //that rabbit hole it's a mess
                //it works at least, even though I don't understand why!?!?
                console.log(document.body.clientHeight);

                computerContainer.setAttribute("id", "fadeIn");
                computerContainer.addEventListener("transitionend", () => {
                    console.log("computer has faded in")
                    const computerSelector = document.createElement("div");
                    const computerSelectorImg = document.createElement("img");
                    computerSelector.setAttribute("class", "container computerSelector");
                    computerSelector.setAttribute("style", "margin-top: -64px;")


                    if (computerChoice === "rock") {
                        computerSelectorImg.src = "img/rock.png";
                        console.log("confirming computer chose rock");

                    } else if (computerChoice === "paper") {
                        computerSelectorImg.src = "img/paper.png";
                        console.log("confirming computer chose paper");

                    } else {
                        computerSelectorImg.src = "img/scissors.png";
                        console.log("confirming computer chose scissors");
                    };

                    container.appendChild(computerSelector);
                    computerSelector.appendChild(computerSelectorImg);

                    // if it works it works I GUESS?????
                    console.log(document.body.clientHeight);
                    computerSelector.setAttribute("id", "fadeIn");

                    const mainContainer = document.querySelector(".content");
                    const resultText = document.createElement("pre");
                    resultText.setAttribute("class", "resultText");
                    computerSelector.addEventListener("transitionend", () => {
                        if (playerChoice === computerChoice) {
                            resultText.textContent = "the result is a tie\n\nno points awarded";

                        } else if (playerChoice === "rock" && computerChoice === "scissors") {
                            resultText.textContent = "rock beats scissors\n\nwell done!";

                        } else if (playerChoice === "paper" && computerChoice === "rock") {
                            resultText.textContent = "paper beats rock\n\nwell done!";

                        } else if (playerChoice === "scissors" && computerChoice === "paper") {
                            resultText.textContent = "scissors beats paper\n\nwell done!";

                        } else {
                            resultText.textContent = "the computer has won\n\nthere's always next time";

                        }
                        mainContainer.after(resultText);
                        resultText.setAttribute("id", "fadeIn");
                    })

                });
            }
        });
    };


    //  refactor code time
    // if (playerChoice != 'rock' && playerChoice != 'paper' && playerChoice != 'scissors') {
    //         alert('You have chosen an incorrect option. \nYou lose this round!')
    //         return ++computerScore, playerScore
    //     } else if (playerChoice === computerChoice) {
    //         alert('This round was a tie! No points awarded for either player.');
    //         return
    //     } else if (playerChoice === 'rock' && computerChoice === 'scissors') {
    //         alert('You have won this round!');
    //         return ++playerScore, computerScore;
    //     } else if (playerChoice === 'paper' && computerChoice === 'rock') {
    //         alert('You have won this round!');
    //         return ++playerScore, computerScore;
    //     } else if (playerChoice === 'scissors' && computerChoice === 'paper'){
    //         alert('You have won this round!');
    //         return ++playerScore, computerScore;
    //     } else {
    //         alert('The computer has won this round!');
    //         return ++computerScore, playerScore;
    //     }
}

function playGame() {
    console.log("game started")
    const rockSelect = document.querySelector("#rock");
    const paperSelect = document.querySelector("#paper");
    const scissorSelect = document.querySelector("#scissors")

    rockSelect.setAttribute("id", "fadeIn");
    paperSelect.setAttribute("id", "fadeIn");
    scissorSelect.setAttribute("id", "fadeIn");

    rockSelect.addEventListener("click", () => {
        playRound("rock")
    })

    paperSelect.addEventListener("click", () => {
        playRound("paper")
    })

    scissorSelect.addEventListener("click", () => {
        playRound("scissors")
    })
}

//  --------------------   End Game Logic   --------------------  //


//  -------------   splashscreen for game start   -------------   //
const startGame = document.querySelector(".play");
const splashScreen = document.querySelector(".splash");

startGame.addEventListener("click", () => {
    splashScreen.setAttribute("id", "fadeOut");
    splashScreen.addEventListener("transitionend", () => {
        splashScreen.remove();

    });

    playGame();
});