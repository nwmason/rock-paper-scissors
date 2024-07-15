// generates random computer choice
function getComputerChoice() {
    let choice = Math.random();

    if (choice <= 0.4) {
        return 'scissors';       // let's be real, most people select scissors
    } else if (choice <= 0.7) {
        return 'rock';
    } else {
        return 'paper';
    }
}

// collects player choice
function getPlayerChoice() {
    let choice = prompt('Rock, Paper, or Scissors?')

    if (choice.toLowerCase().includes('rock')) {
        alert('You have chosen rock!')
        return choice
    } else if (choice.toLowerCase().includes('scissors')) {
        alert('You have chosen scissors!')
    } else if (choice.toLowerCase().includes('paper')) {
        alert('You have chosen rock!')
    } else {        // we all know that one kid who selected "rocket launcher" at the school playground. Automatic lose state.
        alert('You have chosen an incorrect option. You lose!') 
    }
}

//  game logic, determining who is a winner and who is a loser for the round
function playRound(playerChoice, computerChoice) {

    playerChoice = getPlayerChoice();
    computerChoice = getComputerChoice();

    alert('The computer picks ' + computerChoice)

    if (playerChoice === computerChoice) {
        alert('This round was a tie! No points awarded for either player.');
    } else if (playerChoice === 'rock' && computerChoice === 'scissors') {
        alert('You have won this round!');
        return ++playerScore, computerScore;
    } else if (playerChoice === 'paper' && computerChoice === 'rock') {
        alert('You have won this round!');
        return ++playerScore, computerScore;
    } else if (playerChoice === 'scissors' && computerChoice === 'paper'){
        alert('You have won this round!');
        return ++playerScore, computerScore;
    } else {
        alert('The computer has won this round!');
        return ++computerScore, playerScore;
    }
}

//  flavor text to keep player informed, loops rounds until someone wins with win/loss text
function playGame() {
    alert('Computer Score: ' + computerScore + '\nPlayer Score: ' + playerScore + '\nThe game will now begin!')
    while (playerScore < 3 && computerScore < 3) {      // ensures a best of 5 game, someone will win and someone will lose.
        playRound()
        alert('Computer Score: ' + computerScore + '\nPlayer Score: ' + playerScore)
    }
    if (computerScore === 3) {
        alert('The computer has won this time. You lose!')
    } else if (playerScore === 3) {
        alert('Winner Winner, Chicken Dinner!')
    }
}

//  --------------------   End Function Stuff   --------------------  //
let computerScore = 0, playerScore = 0;

playGame();