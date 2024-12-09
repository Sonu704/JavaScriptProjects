'use strict';
/*
--------------------------------------------------------------------------
console.log(document.querySelector('.message').textContent);

console.log(
  (document.querySelector('.message').textContent = 'please guess the value')
);

console.log(document.querySelector('.score').textContent);

console.log((document.querySelector('.score').value = 28));


----------------------------------------------------------------------------
*/

let screatNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highScore = 0;

const displayMsg = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    displayMsg('No number');
  } else if (guess === screatNumber) {
    displayMsg('You guessed correct');
    document.querySelector('.number').textContent = screatNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== screatNumber && score > 1) {
    displayMsg(guess > screatNumber ? 'Too High' : 'Too low');
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    displayMsg('you lost');
    document.querySelector('.score').textContent = 0;
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  document.querySelector('.score').textContent = 20;
  displayMsg('Start Guessing .....');
  document.querySelector('.guess').value = null;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  screatNumber = Math.trunc(Math.random() * 20) + 1;
});
