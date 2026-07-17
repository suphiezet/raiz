const canvas = document.getElementById('progressCanvas');
const ctx = canvas.getContext('2d');
const display = document.getElementById('display');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

let totalSeconds = 0, remainingSeconds = 0;
let timerInterval = null, running = false;

function drawCircle(percent) {
    ctx.clearRect(0, 0, 220, 220);
    const x = 110, y = 110, radius = 90;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.strokeStyle = '#2a2a4a';
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, radius, -Math.PI/2, -Math.PI/2 + 2*Math.PI*percent);
    const gradient = ctx.createLinearGradient(0,0,220,220);
    gradient.addColorStop(0, '#ff0055');
    gradient.addColorStop(1, '#ff8800');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function updateDisplay() {
    let h = Math.floor(remainingSeconds/3600);
    let m = Math.floor((remainingSeconds%3600)/60);
    let s = remainingSeconds%60;
    display.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    let percent = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
    drawCircle(percent);
}

function getTotalSeconds() {
    let h = parseInt(hoursInput.value) || 0;
    let m = parseInt(minutesInput.value) || 0;
    let s = parseInt(secondsInput.value) || 0;
    return h*3600 + m*60 + s;
}

document.getElementById('startBtn').addEventListener('click', ()=>{
    if (!running) {
        if (remainingSeconds <= 0) {
            totalSeconds = getTotalSeconds();
            remainingSeconds = totalSeconds;
        }
        if (remainingSeconds <= 0) return;
        timerInterval = setInterval(()=>{
            remainingSeconds--;
            updateDisplay();
            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                running = false;
                alert('Tempo esgotado!');
            }
        }, 1000);
        running = true;
    }
});
document.getElementById('pauseBtn').addEventListener('click', ()=>{
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
});
document.getElementById('resetBtn').addEventListener('click', ()=>{
    clearInterval(timerInterval);
    running = false;
    totalSeconds = getTotalSeconds();
    remainingSeconds = totalSeconds;
    updateDisplay();
});

// iniciar com valores zerados
updateDisplay();