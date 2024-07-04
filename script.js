let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        toggleButtonState();
    }
}

function stop() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay(true); // Pass true to indicate reset display
    toggleButtonState();
}

function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        toggleButtonState();
    }
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 0;
    lapsContainer.innerHTML = '';
    updateDisplay(true); // Pass true to indicate reset display
    toggleButtonState();
}

function lap() {
    if (isRunning) {
        lapCounter++;
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateDisplay(reset = false) {
    if (reset) {
        display.textContent = "00:00:00:00";
    } else {
        elapsedTime = Date.now() - startTime;
        const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);

        display.textContent = 
            `${hours.toString().padStart(2, '0')}:` + 
            `${minutes.toString().padStart(2, '0')}:` + 
            `${seconds.toString().padStart(2, '0')}:` + 
            `${milliseconds.toString().padStart(2, '0')}`;
    }
}

function toggleButtonState() {
    startButton.disabled = isRunning;
    pauseButton.disabled = !isRunning;
}
