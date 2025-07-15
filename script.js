let initialTime, initialRounds, initialDecrement, roundsLeft = null;
let isRunning = false;
let countdownInterval = null;
let stageTimeout = null;

const timerDisplay = document.getElementById("timer");
const roundsDisplay = document.getElementById("rounds");
const decrementDisplay = document.getElementById("decrement");
const timerLabel = document.getElementById("timer_label");
const roundsLabel = document.getElementById("rounds_label");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const beepSound = document.getElementById("beepSound");

let timerlabelinitvalue = timerLabel.textContent
let roundslabelinitvalue = roundsLabel.textContent

/* Avvia il timer (ricorsivo) */
function startTimer(delayInSeconds) {
  let secondsRemaining = delayInSeconds;

  timerDisplay.value = secondsRemaining;
  roundsDisplay.value = roundsLeft

  // Mostra il countdown ogni secondo
  countdownInterval = setInterval(() => {
    secondsRemaining--;
    timerDisplay.value = secondsRemaining;
  }, 1000);

  // Alla fine dell'intervallo
  timerTimeout = setTimeout(() => {
    clearInterval(countdownInterval);
    beepSound.play();

    roundsLeft--;
    if (roundsLeft > 0) {
      startTimer((initialTime - (initialRounds - roundsLeft) * initialDecrement));
    } else {
      isRunning = false;
      resetTimer()
    }
  }, (initialTime - (initialRounds - roundsLeft) * initialDecrement) * 1000);
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    timerLabel.textContent = "Time left in this round"
    roundsLabel.textContent = "Rounds left"

    timerDisplay.disabled = true
    roundsDisplay.disabled = true
    decrementDisplay.disabled = true

    initialDecrement = parseInt(decrementDisplay.value)
    initialRounds = parseInt(roundsDisplay.value)
    initialTime = parseInt(timerDisplay.value)
    roundsLeft = initialRounds

    isRunning = true;
    startTimer(initialTime);
  }
});

resetBtn.addEventListener("click", () => {
  if (isRunning) {
    clearTimeout(timerTimeout);
    clearInterval(countdownInterval);
    isRunning = false;
  } else {
    resetTimer()
  }
});

function resetTimer() {
  timerLabel.textContent = timerlabelinitvalue
  roundsLabel.textContent = roundslabelinitvalue

  timerDisplay.value = initialTime
  roundsDisplay.value = initialRounds
  decrementDisplay.value = initialDecrement

  timerDisplay.disabled = false
  roundsDisplay.disabled = false
  decrementDisplay.disabled = false
}
