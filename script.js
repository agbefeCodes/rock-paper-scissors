// SELECTING DOM ELEMENTS
const btns = document.querySelectorAll('.btn');
const reset = document.querySelector('.reset');
const playerScore = document.querySelector('.p-Score');
const cpuScore = document.querySelector('.c-Score');

// function to get computer choice
const getComputerChoice = () => {
  const choices = ['rock', 'paper', 'scissors'];
  const n = Math.floor(Math.random() * 3 + 1);
  const choice = choices[n - 1];

  return choice;
};
// GAME ATTRIBUTES
let playing = true;
let pScore = 0;
let cScore = 0;
let playCount = 0;

// PLAY ROUND FUNCTION

const choices = [];

const playRound = (pChoice, cChoice) => {
  if (
    (pChoice === 'rock' && cChoice === 'scissors') ||
    (pChoice === 'paper' && cChoice === 'rock') ||
    (pChoice === 'scissors' && cChoice === 'paper')
  ) {
    pScore += 1;
    playCount += 1;
    console.log(playCount);
    console.log(pScore, cScore);
    return `You Win! ${pChoice} beats ${cChoice}`;
  }
  if (pChoice === cChoice) {
    playCount += 1;
    console.log(playCount);
    console.log(pScore, cScore);
    return `DRAW! ${pChoice} = ${cChoice}`;
  }
  cScore += 1;
  playCount += 1;
  cpuScore.textContent=cScore;
  console.log(playCount);
  console.log(pScore, cScore);
  return `You Lose! ${cChoice} beats ${pChoice}`;
};

// PLAY GAME
const game = (playerChoice, c) => {
  let result;

  const value = playRound(playerChoice, getComputerChoice());
  console.log(value);

  // END THE GAME
  if (pScore > 4 && cScore < 5) {
    playing = false;
    result = `You Won ${pScore} to ${cScore}`;
    return console.log(result);
  }
  if (pScore < 5 && cScore > 4) {
    playing = false;
    result = `You Lost ${pScore} to ${cScore}`;
    return console.log(result);
  }
};

// PLAYER CHOICE FUNCTION

const playerChoiceHandler = e => {
  if (playing) {
    const {value} = e.target.dataset;
    game(value);
    playerScore.textContent = pScore;
  }
};

// ADDING LISTENER TO BUTTON ELEMENTS
btns.forEach(btn => {
  btn.addEventListener('click', playerChoiceHandler);
});

// RESET FUNCTION
const resetHandle = () => {
  console.log('reset');
  playing = true;
  pScore = 0;
  cScore = 0;
  playCount = 0;
  playerScore.textContent=pScore;
};

reset.addEventListener('click', resetHandle);
