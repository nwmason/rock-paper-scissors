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