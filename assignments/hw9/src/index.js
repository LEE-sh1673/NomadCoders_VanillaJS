const inputRange = document.getElementById("gameInput__range");
const inputSubmit = document.getElementById("gameInput__submit"),
  currentInput = inputSubmit.querySelector("input[type='text']");

const info = document.querySelector("h3"),
  maxValue = info.querySelector("span:last-child");

const gameStatus = document.querySelector(".gameStatus"),
  playerChose = gameStatus.querySelector("span:first-child"),
  machineChose = gameStatus.querySelector("span:last-child");

const gameResult = document.querySelector(".gameResult");

maxValue.innerText = inputRange.value;

function getRandomNumber(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function upDateGameStatus(guessNumber) {
  playerChose.innerText = guessNumber;
  machineChose.innerText = getRandomNumber(maxValue.innerText);
  gameStatus.style.display = "block";
}

function showGameResult(guessNumber) {
  upDateGameStatus(guessNumber);
  const player = playerChose.innerText;
  const machine = machineChose.innerText;

  if (player === machine) {
    gameResult.innerText = "You won!";
  } else {
    gameResult.innerText = "You lost!";
  }
  gameResult.style.display = "block";
}

inputRange.addEventListener("change", function (event) {
  maxValue.innerText = event.target.value;
});

inputSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  showGameResult(currentInput.value);
});
