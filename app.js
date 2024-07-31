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
    }




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

//  flavor text to keep player informed, loops rounds until someone wins with win/loss text
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


//  ----------------   Pointless splashscreen   ----------------  //
const startGame = document.querySelector(".play");
const splashScreen = document.querySelector(".splash");

startGame.addEventListener("click", () => {
    splashScreen.setAttribute("id", "fadeOut");
    splashScreen.addEventListener("transition", () =>  {
        splashScreen.remove();

    });

    playGame();
});