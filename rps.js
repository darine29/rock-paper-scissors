let score = JSON.parse(localStorage.getItem('score')) ||
  {
    wins: 0,
    losses: 0,
    ties: 0
  };
updateScore();

//assigning random numbers (0,1] to a computer move
function computerChoice() {
  const randomNumber = Math.random();
  let computerMove = '';
 
  if (randomNumber < 1/3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return(computerMove);
}

// compares player move to computer move, and calls other functions
function playGame(playerMove) {
  let result = '';
  const computerMove = computerChoice();

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie'
    }
    else if (computerMove === 'paper') {
      result = 'You lost'
    }
    else if (computerMove === 'scissors') {
      result = 'You won'
    }
  }

  if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You won'
    }
    else if (computerMove === 'paper') {
      result = 'Tie'
    }
    else if (computerMove === 'scissors') {
      result = 'You lost'
    }
  }

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lost'
    }
    else if (computerMove === 'paper') {
      result = 'You won'
    }
    else if (computerMove === 'scissors') {
      result = 'Tie'
    }
  }
  updateScore(result);
  updateWinner(result);
  updateMoves(playerMove, computerMove)
}

// updates score object and calls on function to show score on page 
function updateScore(result)  {
  if (result === 'Tie') {
    score.ties = score.ties + 1;
  }
  else if (result === 'You won') {
    score.wins = score.wins + 1;
  }
  else if (result === 'You lost') {
    score.losses = score.losses + 1;
  }
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreOnPage();
}

function updateScoreOnPage() {
  document.querySelector('.js-update-scores').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

// updates who won
function updateWinner(result) {
  document.querySelector('.js-update-winner').innerHTML = result;
}

// updates moves played by player and computer
function updateMoves(playerMove, computerMove) {
  document.querySelector('.js-update-move')
    .innerHTML = 
    `You <img class="${playerMove}-image-move" src="images/${playerMove}-emoji.png">   Computer <img class="${computerMove}-image-move"src="images/${computerMove}-emoji.png">`;
}
