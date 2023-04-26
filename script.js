// SELECTING DOM ELEMENTS
const btns = document.querySelectorAll('.btn');
const reset = document.querySelector('.reset');
const playerScore = document.querySelector('.p-Score');
const cpuScore = document.querySelector('.c-Score');
const stage = document.querySelector('.stage');

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

// PLAY ROUND FUNCTION
const playRound = (pChoice, cChoice) => {
  // GET CPU IMOJI
  const cpuImoji = ['✊🏾', '🤚🏾', '✌🏾'];
  const imoji =
    cChoice === 'rock'
      ? cpuImoji[0]
      : cChoice === 'paper'
      ? cpuImoji[1]
      : cpuImoji[2];

  if (
    (pChoice === 'rock' && cChoice === 'scissors') ||
    (pChoice === 'paper' && cChoice === 'rock') ||
    (pChoice === 'scissors' && cChoice === 'paper')
  ) {
    pScore += 1;
    playerScore.textContent = pScore;
    cpuScore.textContent = `${cScore} ${imoji}`;
    stage.innerHTML = `You Won This Round! ${pChoice} beats ${cChoice}<br> 😀`;
    return `You Won This Round! ${pChoice} beats ${cChoice} `;
  }
  if (pChoice === cChoice) {
    cpuScore.textContent = `${cScore} ${imoji}`;
    stage.innerHTML = `DRAW! ${pChoice} = ${cChoice}<br> 🤔`;
    return `DRAW! ${pChoice} = ${cChoice} `;
  }
  cScore += 1;
  cpuScore.textContent = `${cScore} ${imoji}`;
  stage.innerHTML = `You Lost This Round! ${cChoice} beats ${pChoice} <br>🙁`;
  return `You Lost This Round! ${cChoice} beats ${pChoice}`;
};

// PLAY GAME
const game = playerChoice => {
  let result;

  playRound(playerChoice, getComputerChoice());

  // END THE GAME
  if (pScore > 4 && cScore < 5) {
    playing = false;
    result = `You Won ${pScore} to ${cScore} <br class= "result"> 😀`;
    stage.innerHTML = result;
  }
  if (pScore < 5 && cScore > 4) {
    playing = false;
    result = `You Lost <br> ${pScore} to ${cScore} <br class="result"> 🙁`;
    stage.innerHTML = result;
  }
};

// PLAYER CHOICE FUNCTION

const playerChoiceHandler = e => {
  if (playing) {
    const {value} = e.target.dataset;
    game(value);
    playerScore.textContent = `${e.target.value} ${pScore}`;
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
  playerScore.textContent = pScore;
  cpuScore.textContent = cScore;
  stage.textContent = '';
};

reset.addEventListener('click', resetHandle);
