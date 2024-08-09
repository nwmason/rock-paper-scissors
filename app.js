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

// this block feels like a mess, but i don't know how else to solve the issue
// of divs loading before the previous divs are deleting creating an awkward spacing
// just know that while this works, it looks awful and probably is awful
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
                // instead it kept popping in, I've been messing with this
                // for like 2 hours
                // finally gave in and checked stack overflow, im not going down
                // that rabbit hole it's a mess of people arguing
                // it works at least, even though I don't understand why!?!?
                console.log(document.body.clientHeight);

                computerContainer.setAttribute("id", "fadeIn");
                computerContainer.addEventListener("transitionend", () => {
                    const computerSelector = document.createElement("div");
                    const computerSelectorImg = document.createElement("img");
                    computerSelector.setAttribute("class", "container computerSelector");
                    computerSelector.setAttribute("style", "margin-top: -64px;")

                    if (computerChoice === "rock") {
                        computerSelectorImg.src = "img/rock.png";

                    } else if (computerChoice === "paper") {
                        computerSelectorImg.src = "img/paper.png";

                    } else {
                        computerSelectorImg.src = "img/scissors.png";
                    };

                    container.appendChild(computerSelector);
                    computerSelector.appendChild(computerSelectorImg);

                    // if it works it works I GUESS?????
                    console.log(document.body.clientHeight);
                    computerSelector.setAttribute("id", "fadeIn");
                    
                    console.log(document.body.clientHeight);
                    computerSelector.addEventListener("transitionend", () => {
                        if (playerChoice === computerChoice) {
                            
                            displayResults("the result is a tie\n\nno points awarded");
                        
                            computerSelector.addEventListener("transitionend", () => {
                                computerContainer.remove();
                                computerSelector.remove();
                                createChoiceScreen(playerScore, computerScore);
                            }, { once: true });
                        } else if (playerChoice === "rock" && computerChoice === "scissors") {
                            displayResults("rock beats scissors\n\nwell done");

                            computerSelector.addEventListener("transitionend", () => {
                                incrementPlayerScore(playerScore, computerScore);
                            }, { once: true });
                        } else if (playerChoice === "paper" && computerChoice === "rock") {
                            displayResults("paper beats rock\n\nwell done");

                            computerSelector.addEventListener("transitionend", () => {
                                incrementPlayerScore(playerScore, computerScore);
                            }, { once: true });
                        } else if (playerChoice === "scissors" && computerChoice === "paper") {
                            displayResults("scissors beats paper\n\nwell done");

                            computerSelector.addEventListener("transitionend", () => {
                                incrementPlayerScore(playerScore, computerScore);
                            }, { once: true });
                        } else {
                            displayResults("the computer won the round\n\nwomp womp");
    
                            computerSelector.addEventListener("transitionend", () => {
                                incrementComputerScore(playerScore, computerScore);
                            }, { once: true });
                        }
                    }, { once: true });

                }, { once: true });
            }
        }, { once: true });
    };
}

// ---------------------------------------------------------------------- //
function playGame(playerScore, computerScore) {
    const rockSelect = document.querySelector("#rock");
    const paperSelect = document.querySelector("#paper");
    const scissorSelect = document.querySelector("#scissors")

    console.log(document.body.clientHeight);
    rockSelect.setAttribute("id", "fadeIn");
    paperSelect.setAttribute("id", "fadeIn");
    scissorSelect.setAttribute("id", "fadeIn");

    rockSelect.addEventListener("click", () => {
        playRound("rock", getComputerChoice(), playerScore, computerScore)
    }, { once: true });

    paperSelect.addEventListener("click", () => {
        playRound("paper", getComputerChoice(), playerScore, computerScore)
    }, { once: true });

    scissorSelect.addEventListener("click", () => {
        playRound("scissors", getComputerChoice(), playerScore, computerScore)
    }, { once: true });
}

function displayResults(text) {
    const resultText = document.querySelector(".resultText");
    const computerContainer = document.querySelector(".computerSelection");
    const computerSelector = document.querySelector(".computerSelector")
    resultText.textContent = text;

    console.log(document.body.clientHeight);
    resultText.setAttribute("id", "fadeIn");
    console.log(document.body.clientHeight);

    resultText.addEventListener("transitionend", () => {
        computerContainer.setAttribute("id", "fadeOut");
        resultText.setAttribute("id", "fadeOut");
        computerSelector.setAttribute("id", "fadeOut");
    
    }, { once: true });
}

function incrementPlayerScore(playerScore, computerScore) {
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
        if (playerScore < 5) {
            createChoiceScreen(playerScore, computerScore);
        } else {
            gameOver(playerScore, computerScore);
        }
    }, { once: true });
}

function incrementComputerScore(playerScore, computerScore) {
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
        if (computerScore < 5) {
            createChoiceScreen(playerScore, computerScore);
        } else {
            gameOver(playerScore, computerScore);
        }
    }, { once: true });
}

function createChoiceScreen(playerScore, computerScore) {
    const selectorRock = document.createElement("div");
    const rockImg = document.createElement("img");
    const selectorPaper = document.createElement("div");
    const paperImg = document.createElement("img");
    const selectorScissors = document.createElement("div");
    const scissorsImg = document.createElement("img");
    const content = document.querySelector(".content");

    selectorRock.setAttribute("class", "selector container");
    selectorRock.setAttribute("id", "rock");
    rockImg.src = "img/rock.png";
    selectorPaper.setAttribute("class", "selector container");
    selectorPaper.setAttribute("id", "paper");
    paperImg.src = "img/paper.png";
    selectorScissors.setAttribute("class", "selector container");
    selectorScissors.setAttribute("id", "scissors");
    scissorsImg.src = "img/scissors.png";

    selectorRock.appendChild(rockImg);
    selectorPaper.appendChild(paperImg);
    selectorScissors.appendChild(scissorsImg);

    content.appendChild(selectorRock);
    content.appendChild(selectorPaper);
    content.appendChild(selectorScissors);

    playGame(playerScore, computerScore);
}

function gameOver(playerScore, computerScore) { 
    const body = document.querySelector("body");

    const endScreen = document.createElement("div");
    const endText = document.createElement("div");
    const playAgain = document.createElement("div");

    endScreen.setAttribute("class", "splash endScreen");
    endText.setAttribute("style", "font-size: 48px; margin-top: 156px; margin-bottom: -96px")
    playAgain.setAttribute("class", "play container");
    playAgain.textContent = "play again?";

    body.appendChild(endScreen);
    endScreen.appendChild(endText);
    endScreen.appendChild(playAgain);

    if (playerScore === 5) {
        endText.textContent = "a winner is you!";
    } else if (computerScore === 5) {
        endText.textContent = "loser :(";
    }

    // i just need to research this at some point
    // like seriously it's annoying
    console.log(document.body.clientHeight);
    endScreen.setAttribute("id", "fadeIn");

    playerScore = 0
    computerScore = 0

    endScreen.addEventListener("click", () => {
        const playerScoreText = document.querySelector("#playerScore");
        const computerScoreText = document.querySelector("#playerScore");    
        playerScoreText.textContent = playerScore;
        computerScoreText.textContent = computerScore;
    
        endScreen.setAttribute("id", "fadeOut");
        endScreen.addEventListener("transitionend", () => {
            endScreen.remove();
            createChoiceScreen(0, 0);
        })
    })
}
//  --------------------   End Game Logic   --------------------  //


//  -------------   splashscreen for game start   -------------   //
const startGame = document.querySelector(".play");
const splashScreen = document.querySelector(".splash");

startGame.addEventListener("click", () => {
    splashScreen.setAttribute("id", "fadeOut");
    splashScreen.addEventListener("transitionend", playGame(0, 0))

}, { once: true });