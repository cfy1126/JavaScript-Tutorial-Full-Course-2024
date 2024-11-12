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
  document.querySelector(
    '.js-moves'
  ).innerHTML = `      You
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
  if(autoPalyElement.innerText === 'Auto Play' && !isAutoPlay){
    autoPalyElement.innerHTML = 'Stop Play';
    intervalId = setInterval(()=>{
      let playerMove = pickComputerMove();
      playGame(playerMove)
      isAutoPlay = true;
    },1000)
  }else{
    autoPalyElement.innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlay = false;
  }
}

const moveRockElement = document.querySelector('.move-rock-button');
const movePaperElement = document.querySelector('.move-paper-button');
const moveScissorsElement = document.querySelector('.move-scissors-button');
const resetScoreElement = document.querySelector('.reset-score-button');
const autoPlayElement = document.querySelector('.auto-play-button');

moveRockElement.addEventListener('click',()=>{
  playGame('rock');
});

movePaperElement.addEventListener('click',()=>{
  playGame('paper');
});
moveScissorsElement.addEventListener('click',()=>{
  playGame('scissors');
})
resetScoreElement.addEventListener('click',()=>{
  localStorage.removeItem('statistics');
  statistics.wins = 0;
  statistics.losses = 0;
  statistics.ties = 0;
  updateScoreElement();
});
autoPlayElement.addEventListener('click',autoPlayGame);

document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors');
  }
})


