const statistics = JSON.parse(localStorage.getItem('statistics')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function playGame(pickMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (pickMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose. ';
    } else if (computerMove === 'paper') {
      result = 'You won. ';
    } else if (computerMove === 'scissors') {
      result = 'tie';
    }
  } else if (pickMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'tie';
    } else if (computerMove === 'paper') {
      result = 'You lose. ';
    } else if (computerMove === 'scissors') {
      result = 'You won. ';
    }
  } else if (pickMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You won. ';
    } else if (computerMove === 'paper') {
      result = 'tie';
    } else if (computerMove === 'scissors') {
      result = 'You lose. ';
    }
  }

  if (result === 'You won. ') {
    statistics.wins++;
  } else if (result === 'You lose. ') {
    statistics.losses++;
  } else if (result === 'tie') {
    statistics.ties++;
  }

  localStorage.setItem('statistics', JSON.stringify(statistics));

  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `      You
<img src="/image/${pickMove}-emoji.png" alt="" class="move-icon">
<img src="/image/${computerMove}-emoji.png"  alt="" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `
    <p>Wins: ${statistics.wins}, Losses: ${statistics.losses}, Ties: ${statistics.ties}</p>
  `;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove;
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

let isAutoPlay = false;
let intervalId;

function autoPlayGame() {
  const autoPalyElement = document.querySelector('.auto-play-button');
  if (autoPalyElement.innerText === 'Auto Play' && !isAutoPlay) {
    autoPalyElement.innerHTML = 'Stop Play';
    intervalId = setInterval(() => {
      let playerMove = pickComputerMove();
      playGame(playerMove);
      isAutoPlay = true;
    }, 1000);
  } else {
    autoPalyElement.innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlay = false;
  }
}

function resetScore() {
  const confirmResetElement = document.querySelector('.confirm-reset');
  confirmResetElement.innerHTML = `
        <p>Are you sure you want to reset the score?</p>
      <button class="yes-reset">Yes</button>
      <button class="no-reset">No</button>
  `;

  document.querySelector('.yes-reset').addEventListener('click', () => {
    localStorage.removeItem('statistics');
    statistics.wins = 0;
    statistics.losses = 0;
    statistics.ties = 0;
    updateScoreElement();
    confirmResetElement.innerHTML = '';
  });

  document.querySelector('.no-reset').addEventListener('click', () => {
    confirmResetElement.innerHTML = '';
  });
}

document.querySelector('.move-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
});
document.querySelector('.move-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
});
document.querySelector('.move-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.reset-score-button')
  .addEventListener('click', resetScore);

document.querySelector('.auto-play-button')
  .addEventListener('click', autoPlayGame);

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlayGame();
  } else if (event.key === 'Backspace') {
    resetScore();
  }
});
