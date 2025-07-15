let currentDelay = 30;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

function runTimer() {
  if (currentDelay <= 0) {
    timerDisplay.textContent = "FINE";
    return;
  }

  timerDisplay.textContent = currentDelay;
  setTimeout(() => {
    currentDelay--;
    runTimer();
  }, currentDelay * 1000);
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    runTimer();
  }
});
