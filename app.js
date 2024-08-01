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

function incrementPlayerScore(playerScore) {
    console.log("score incremented")
    const scoreNumber = document.querySelector("#playerScore");
    scoreNumber.textContent = ++playerScore;

    const computerContainer = document.querySelector(".computerSelection");
    const computerSelector = document.querySelector(".computerSelector");
    const resultText = document.querySelector(".resultText");

    computerContainer.setAttribute("id", "fadeOut");
    resultText.setAttribute("id", "fadeOut");
    computerSelector.setAttribute("id", "fadeOut");
    resultText.addEventListener("transitionend", () => {
        computerContainer.remove();
        computerSelector.remove();
        resultText.remove();
        createChoiceScreen();
    }, { once: true });
}

function incrementComputerScore(computerScore) {
    console.log("score incremented")
    const scoreNumber = document.querySelector("#computerScore");
    scoreNumber.textContent = ++computerScore;

    const computerContainer = document.querySelector(".computerSelection");
    const computerSelector = document.querySelector(".computerSelector");
    const resultText = document.querySelector(".resultText");

    computerContainer.setAttribute("id", "fadeOut");
    resultText.setAttribute("id", "fadeOut");
    computerSelector.setAttribute("id", "fadeOut");
    resultText.addEventListener("transitionend", () => {
        computerContainer.remove();
        computerSelector.remove();
        resultText.remove();
        createChoiceScreen();
    }, { once: true });
}


// there's no way this is an efficient solution to anything i've done in this project
// clearly in over my head in how i decided to go about this
// the challenge will only further my hunger for power
function createChoiceScreen() {
    console.log("we've reached the choice screen")
    // const selectorRock = document.createElement("div");
    // const selectorPaper = document.createElement("div");
    // const selectorScissors = document.createElement("div");


    // selectorRock.setAttribute("class", ".selector .container");
    // selectorRock.setAttribute("id", "#rock");
    // selectorPaper.setAttribute("class", ".selector .container");
    // selectorPaper.setAttribute("id", "#paper");
    // selectorScissors.setAttribute("class", ".selector .container");
    // selectorScissors.setAttribute("id", "#scissors");
}

//  game logic, determining who is a winner and who is a loser for the round
function playRound(playerChoice, computerChoice, playerScore, computerScore) {
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
                    computerChoice = "scissors"
                    console.log(document.body.clientHeight);

                    computerSelector.addEventListener("transitionend", () => {
                        if (playerChoice === computerChoice) {
                            
                            resultText.textContent = "the result is a tie\n\nno points awarded";
                            mainContainer.after(resultText);
                            resultText.setAttribute("id", "fadeIn");
                            console.log(document.body.clientHeight);
                        
                            computerContainer.setAttribute("id", "fadeOut");
                            resultText.setAttribute("id", "fadeOut");
                            computerSelector.setAttribute("id", "fadeOut");
                        
                            computerSelector.addEventListener("transitionend", () => {
                                computerContainer.remove();
                                computerSelector.remove();
                                resultText.remove();
                                createChoiceScreen();
                            });
                        } else if (playerChoice === "rock" && computerChoice === "scissors") {
                            resultText.textContent = "rock beats scissors\n\nwell done!";
                            mainContainer.after(resultText);
                            resultText.setAttribute("id", "fadeIn");
    
                            console.log(document.body.clientHeight);
                            incrementPlayerScore(playerScore);
                        } else if (playerChoice === "paper" && computerChoice === "rock") {
                            resultText.textContent = "paper beats rock\n\nwell done!";
                            mainContainer.after(resultText);
                            resultText.setAttribute("id", "fadeIn");
    
                            console.log(document.body.clientHeight);
                            incrementPlayerScore(playerScore);
                        } else if (playerChoice === "scissors" && computerChoice === "paper") {
                            resultText.textContent = "scissors beats paper\n\nwell done!";
                            mainContainer.after(resultText);
                            resultText.setAttribute("id", "fadeIn");
    
                            console.log(document.body.clientHeight);
                            incrementPlayerScore(playerScore);
                        } else {
                            resultText.textContent = "the computer won the round\n\nwomp womp";
                            mainContainer.after(resultText);
                            resultText.setAttribute("id", "fadeIn");
    
                            console.log(document.body.clientHeight);
                            incrementComputerScore(computerScore);
                        }
                    }, { once: true })

                }, { once: true });
            }
        }, { once: true });
    };
}


function playGame(playerScore, computerScore) {
    console.log("game started")
    const rockSelect = document.querySelector("#rock");
    const paperSelect = document.querySelector("#paper");
    const scissorSelect = document.querySelector("#scissors")

    rockSelect.setAttribute("id", "fadeIn");
    paperSelect.setAttribute("id", "fadeIn");
    scissorSelect.setAttribute("id", "fadeIn");

    rockSelect.addEventListener("click", () => {
        playRound("rock", getComputerChoice(), playerScore, computerScore)
    }, { once: true })

    paperSelect.addEventListener("click", () => {
        playRound("paper", getComputerChoice(), playerScore, computerScore)
    }, { once: true })

    scissorSelect.addEventListener("click", () => {
        playRound("scissors", getComputerChoice(), playerScore, computerScore)
    }, { once: true })
}

//  --------------------   End Game Logic   --------------------  //


//  -------------   splashscreen for game start   -------------   //
const startGame = document.querySelector(".play");
const splashScreen = document.querySelector(".splash");

startGame.addEventListener("click", () => {
    splashScreen.setAttribute("id", "fadeOut");
    splashScreen.addEventListener("transitionend", () => {
        splashScreen.remove();

    }, { once: true });

    playGame(0, 0);
});