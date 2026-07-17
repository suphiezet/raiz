const canvas = document.getElementById('progressCanvas');
const ctx = canvas.getContext('2d');
const display = document.getElementById('display');

let startTime = 0, elapsed = 0, timerInterval = null, running = false;

function drawCircle(percent) {
    ctx.clearRect(0, 0, 220, 220);
    const x = 110, y = 110, radius = 90;
    // fundo
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.strokeStyle = '#2a2a4a';
    ctx.lineWidth = 8;
    ctx.stroke();

    // progresso com gradiente
    ctx.beginPath();
    ctx.arc(x, y, radius, -Math.PI/2, -Math.PI/2 + 2*Math.PI*percent);
    const gradient = ctx.createLinearGradient(0,0,220,220);
    gradient.addColorStop(0, '#00c8ff');
    gradient.addColorStop(1, '#b400ff');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function formatTime(ms) {
    let totalSec = Math.floor(ms/1000);
    let h = Math.floor(totalSec/3600);
    let m = Math.floor((totalSec%3600)/60);
    let s = totalSec%60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function updateDisplay() {
    let now = Date.now();
    elapsed = now - startTime;
    display.textContent = formatTime(elapsed);
    // Máximo de 24h (86400000ms) como 100%
    let percent = Math.min(elapsed / 86400000, 1);
    drawCircle(percent);
}

document.getElementById('startBtn').addEventListener('click', ()=>{
    if (!running) {
        startTime = Date.now() - elapsed;
        timerInterval = setInterval(updateDisplay, 50);
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
    elapsed = 0;
    display.textContent = '00:00:00';
    drawCircle(0);
});

drawCircle(0);