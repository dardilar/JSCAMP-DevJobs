const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.getElementById('score-display');
const bestScoreDisplay = document.getElementById('best-score-display');
const instructionsScreen = document.getElementById('instructions-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScore = document.getElementById('final-score');
const finalBest = document.getElementById('final-best');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const soundToggle = document.getElementById('sound-toggle');

let width, height;
let gameState = 'instructions';
let score = 0;
let bestScore = parseInt(localStorage.getItem('neonDashBest')) || 0;
let soundEnabled = true;
let audioCtx = null;

let shakeX = 0;
let shakeY = 0;
let shakeDuration = 0;
let shakeIntensity = 0;

let flashAlpha = 0;
let scorePopups = [];

const player = {
    x: 100,
    y: 0,
    size: 30,
    velocityY: 0,
    gravity: 0.55,
    jumpForce: -12.5,
    isGrounded: false,
    jumpsLeft: 0,
    maxJumps: 2,
    trail: []
};

let obstacles = [];
let particles = [];
let stars = [];
let spawnTimer = 0;
let spawnInterval = 90;
let gameSpeed = 6;
let frameCount = 0;
let groundY = 0;
let powerups = [];
let activePowerup = null;
let powerupTimer = 0;
let collectibleOrbs = [];
const POWERUP_TYPES = [
    { name: 'shield', color: '#0f0', duration: 300 },
    { name: 'slowmo', color: '#00f', duration: 240 },
    { name: 'multiplier', color: '#ff0', duration: 240 },
    { name: 'magnet', color: '#f0f', duration: 300 }
];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    groundY = height - 80;
    player.y = groundY - player.size;
}

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playJumpSound() {
    if (!soundEnabled || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
}

function playScoreSound() {
    if (!soundEnabled || !audioCtx) return;
    const notes = [523, 659, 784];
    notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.05);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.05 + 0.1);
        osc.start(audioCtx.currentTime + i * 0.05);
        osc.stop(audioCtx.currentTime + i * 0.05 + 0.1);
    });
}

function playDeathSound() {
    if (!soundEnabled || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
}

function playNearMissSound() {
    if (!soundEnabled || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.06);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
}

function createParticles(x, y, color, count, spread = 10) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x,
            y,
            velocityX: (Math.random() - 0.5) * spread,
            velocityY: (Math.random() - 0.5) * spread,
            size: Math.random() * 6 + 2,
            color,
            life: 1,
            decay: Math.random() * 0.025 + 0.015
        });
    }
}

function createStars() {
    stars = [];
    for (let i = 0; i < 80; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * (groundY - 50),
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.3 + 0.1,
            twinkle: Math.random() * Math.PI * 2
        });
    }
}

function triggerShake(duration, intensity) {
    shakeDuration = duration;
    shakeIntensity = intensity;
}

function triggerFlash(alpha) {
    flashAlpha = alpha;
}

function addScorePopup(text, x, y) {
    scorePopups.push({
        text,
        x,
        y,
        life: 1,
        decay: 0.02
    });
}

function updateShake() {
    if (shakeDuration > 0) {
        shakeX = (Math.random() - 0.5) * shakeIntensity;
        shakeY = (Math.random() - 0.5) * shakeIntensity;
        shakeDuration--;
        shakeIntensity *= 0.92;
    } else {
        shakeX = 0;
        shakeY = 0;
    }
}

function updateFlash() {
    if (flashAlpha > 0) {
        flashAlpha *= 0.85;
        if (flashAlpha < 0.01) flashAlpha = 0;
    }
}

function jump() {
    if (gameState === 'instructions') {
        initAudio();
        startGame();
        return;
    }
    if (gameState === 'gameover') return;

    if (player.jumpsLeft > 0) {
        const isSecondJump = player.jumpsLeft === 1;
        player.velocityY = isSecondJump ? player.jumpForce * 0.7 : player.jumpForce;
        player.jumpsLeft--;
        player.isGrounded = false;
        playJumpSound();
        const color = isSecondJump ? '#ff0' : '#0ff';
        createParticles(player.x + player.size / 2, player.y + player.size, color, 6, 8);
    }
}

function startGame() {
    gameState = 'playing';
    document.getElementById('powerup-hud').classList.add('hidden');
    instructionsScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    score = 0;
    frameCount = 0;
    gameSpeed = 6;
    spawnInterval = 90;
    spawnTimer = 0;
    obstacles = [];
    particles = [];
    scorePopups = [];
    player.y = groundY - player.size;
    player.velocityY = 0;
    player.isGrounded = false;
    player.jumpsLeft = player.maxJumps;
    player.trail = [];
    powerups = [];
    activePowerup = null;
    powerupTimer = 0;
    collectibleOrbs = [];
    createStars();
    updateScoreDisplay();
}

function gameOver() {
    gameState = 'gameover';
    playDeathSound();
    createParticles(player.x + player.size / 2, player.y + player.size / 2, '#f00', 40, 15);
    triggerShake(25, 20);
    triggerFlash(0.6);

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('neonDashBest', bestScore);
    }

    finalScore.textContent = `Score: ${score}`;
    finalBest.textContent = `Best: ${bestScore}`;
    gameOverScreen.classList.remove('hidden');
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score;
    bestScoreDisplay.textContent = `BEST: ${bestScore}`;
}

function spawnObstacle() {
    const types = ['tall', 'short', 'medium'];
    const type = types[Math.floor(Math.random() * types.length)];

    let obsHeight, obsWidth;
    if (type === 'tall') {
        obsHeight = 140 + Math.random() * 60;
        obsWidth = 35;
    } else if (type === 'short') {
        obsHeight = 80 + Math.random() * 30;
        obsWidth = 30;
    } else {
        obsHeight = 100 + Math.random() * 40;
        obsWidth = 32;
    }

    obstacles.push({
        x: width + 50,
        y: groundY - obsHeight,
        width: obsWidth,
        height: obsHeight,
        color: '#f0f',
        passed: false
    });
}

function spawnPowerup() {
    const type = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
    powerups.push({
        x: width + 50,
        y: groundY - 100 - Math.random() * 200,
        size: 22,
        type: type,
        bobOffset: Math.random() * Math.PI * 2
    });
}

function activatePowerup(type) {
    activePowerup = type;
    powerupTimer = type.duration;

    const hud = document.getElementById('powerup-hud');
    const icon = document.getElementById('powerup-icon');
    const bar = document.getElementById('powerup-bar');

    hud.classList.remove('hidden');
    icon.style.backgroundColor = type.color;
    icon.style.color = type.color;
    bar.style.backgroundColor = type.color;
    bar.style.width = '100%';

    if (type.name === 'magnet') {
        for (let i = 0; i < 8; i++) {
            collectibleOrbs.push({
                x: width + Math.random() * 300,
                y: Math.random() * (groundY - 50),
                size: 14,
                velocityX: 0,
                velocityY: 0,
                collected: false
            });
        }
    }
}

function playPickupSound() {
    if (!soundEnabled || !audioCtx) return;
    const notes = [784, 988, 1175];
    notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.04 + 0.1);
        osc.start(audioCtx.currentTime + i * 0.04);
        osc.stop(audioCtx.currentTime + i * 0.04 + 0.1);
    });
}

function update() {
    if (gameState !== 'playing') return;

    if (activePowerup) {
        powerupTimer--;
        const bar = document.getElementById('powerup-bar');
        bar.style.width = (powerupTimer / activePowerup.duration * 100) + '%';
        if (powerupTimer <= 0) {
            activePowerup = null;
            document.getElementById('powerup-hud').classList.add('hidden');
        }
    }

    frameCount++;

    if (frameCount % 60 === 0) {
        const scoreAmount = (activePowerup && activePowerup.name === 'multiplier') ? 2 : 1;
        score += scoreAmount;
        updateScoreDisplay();
        playScoreSound();
        scorePopups.push({
            text: '+' + scoreAmount,
            x: width / 2,
            y: 80,
            life: 1,
            decay: 0.025
        });
        createParticles(width / 2, 50, '#0ff', 8, 6);
    }

    let speedMultiplier = (activePowerup && activePowerup.name === 'slowmo') ? 0.5 : 1;
    gameSpeed = (6 + Math.min(score * 0.15, 10)) * speedMultiplier;
    spawnInterval = Math.max(45, 90 - Math.floor(score / 3));

    spawnTimer++;
    if (spawnTimer >= spawnInterval) {
        spawnObstacle();
        spawnTimer = 0;
    }

    if (Math.random() < 0.03) {
        spawnPowerup();
    }

    player.velocityY += player.gravity;
    player.y += player.velocityY;

    if (player.y + player.size >= groundY) {
        player.y = groundY - player.size;
        player.velocityY = 0;
        player.isGrounded = true;
        player.jumpsLeft = player.maxJumps;
    }

    player.trail.push({ x: player.x + player.size / 2, y: player.y + player.size / 2 });
    if (player.trail.length > 12) player.trail.shift();

    obstacles.forEach(obs => {
        obs.x -= gameSpeed;

        if (!obs.passed && obs.x + obs.width < player.x) {
            obs.passed = true;
            playNearMissSound();
            addScorePopup('CLOSE!', player.x + 30, player.y - 10);
        }

        if (!activePowerup || activePowerup.name !== 'shield') {
            const margin = 6;
            if (
                player.x + margin < obs.x + obs.width &&
                player.x + player.size - margin > obs.x &&
                player.y + margin < obs.y + obs.height &&
                player.y + player.size - margin > obs.y
            ) {
                gameOver();
            }
        }
    });

    obstacles = obstacles.filter(obs => obs.x + obs.width > -50);

    powerups.forEach(pu => {
        pu.x -= gameSpeed;
        pu.bobOffset += 0.05;
    });
    powerups = powerups.filter(pu => pu.x > -50);

    powerups = powerups.filter(pu => {
        const bobY = pu.y + Math.sin(pu.bobOffset) * 10;
        const margin = 5;
        if (
            player.x < pu.x + pu.size &&
            player.x + player.size > pu.x &&
            player.y < bobY + pu.size &&
            player.y + player.size > bobY
        ) {
            activatePowerup(pu.type);
            createParticles(pu.x + pu.size / 2, bobY + pu.size / 2, pu.type.color, 12, 10);
            playPickupSound();
            return false;
        }
        return true;
    });

    collectibleOrbs.forEach(orb => {
        orb.x -= gameSpeed * 0.8;
        if (activePowerup && activePowerup.name === 'magnet') {
            const dx = (player.x + player.size / 2) - (orb.x + orb.size / 2);
            const dy = (player.y + player.size / 2) - (orb.y + orb.size / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 300) {
                orb.x += dx * 0.06;
                orb.y += dy * 0.06;
            }
        }
        if (
            player.x < orb.x + orb.size &&
            player.x + player.size > orb.x &&
            player.y < orb.y + orb.size &&
            player.y + player.size > orb.y
        ) {
            score += 1;
            updateScoreDisplay();
            createParticles(orb.x, orb.y, '#f0f', 6, 6);
            orb.collected = true;
        }
    });
    collectibleOrbs = collectibleOrbs.filter(orb => !orb.collected && orb.x > -50);

    particles.forEach(p => {
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.velocityX *= 0.97;
        p.velocityY *= 0.97;
        p.life -= p.decay;
    });
    particles = particles.filter(p => p.life > 0);

    scorePopups.forEach(p => {
        p.y -= 1.5;
        p.life -= p.decay;
    });
    scorePopups = scorePopups.filter(p => p.life > 0);

    stars.forEach(star => {
        star.x -= star.speed;
        star.twinkle += 0.05;
        if (star.x < 0) {
            star.x = width;
            star.y = Math.random() * (groundY - 50);
        }
    });

    updateShake();
    updateFlash();
}

function draw() {
    ctx.save();
    ctx.translate(shakeX, shakeY);

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#050510');
    bgGrad.addColorStop(0.7, '#0a0a1a');
    bgGrad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        const twinkle = 0.3 + Math.sin(star.twinkle) * 0.3;
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    const groundGrad = ctx.createLinearGradient(0, groundY, 0, height);
    groundGrad.addColorStop(0, '#1a1a2e');
    groundGrad.addColorStop(1, '#0f0f1a');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, groundY, width, height - groundY);

    ctx.strokeStyle = '#0ff';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#0ff';
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(width, groundY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    player.trail.forEach((pos, i) => {
        const alpha = (i / player.trail.length) * 0.4;
        const size = (i / player.trail.length) * 8;
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.shadowBlur = 25;
    ctx.shadowColor = '#0ff';
    ctx.fillStyle = '#0ff';
    ctx.fillRect(player.x, player.y, player.size, player.size);
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#88ffff';
    ctx.fillRect(player.x + 4, player.y + 4, player.size - 8, player.size - 8);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x + 8, player.y + 8, 5, 5);
    if (activePowerup && activePowerup.name === 'shield') {
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#0f0';
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.5 + Math.sin(frameCount * 0.1) * 0.3;
        ctx.strokeRect(player.x - 5, player.y - 5, player.size + 10, player.size + 10);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }

    obstacles.forEach(obs => {
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#f0f';
        ctx.fillStyle = '#f0f';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        ctx.fillStyle = '#ff88ff';
        ctx.fillRect(obs.x + 4, obs.y + 4, obs.width - 8, obs.height - 8);

        ctx.shadowBlur = 10;
        ctx.fillStyle = '#f0f';
        ctx.fillRect(obs.x + 8, obs.y + 8, obs.width - 16, obs.height - 16);
        ctx.shadowBlur = 0;
    });

    powerups.forEach(pu => {
        const bobY = pu.y + Math.sin(pu.bobOffset) * 10;
        ctx.shadowBlur = 15;
        ctx.shadowColor = pu.type.color;
        ctx.fillStyle = pu.type.color;
        ctx.fillRect(pu.x, bobY, pu.size, pu.size);
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#fff';
        ctx.fillRect(pu.x + 6, bobY + 6, pu.size - 12, pu.size - 12);
        ctx.shadowBlur = 0;
    });

    collectibleOrbs.forEach(orb => {
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#f0f';
        ctx.fillStyle = '#f0f';
        ctx.beginPath();
        ctx.arc(orb.x + orb.size / 2, orb.y + orb.size / 2, orb.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(orb.x + orb.size / 2, orb.y + orb.size / 2, orb.size / 4, 0, Math.PI * 2);
        ctx.fill();
    });

    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, p.size * p.life, p.size * p.life);
    });
    ctx.globalAlpha = 1;

    scorePopups.forEach(p => {
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.fillStyle = `rgba(255, 255, 0, ${p.life})`;
        ctx.textAlign = 'center';
        ctx.fillText(p.text, p.x, p.y);
    });

    if (flashAlpha > 0) {
        ctx.fillStyle = `rgba(255, 50, 50, ${flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
    }

    if (activePowerup && activePowerup.name === 'slowmo') {
        ctx.fillStyle = 'rgba(0, 0, 80, 0.15)';
        ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', resize);
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        jump();
    }
});
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    jump();
});
canvas.addEventListener('click', jump);

startButton.addEventListener('click', () => {
    initAudio();
    startGame();
});

restartButton.addEventListener('click', () => {
    startGame();
});

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
});

resize();
createStars();
bestScoreDisplay.textContent = `BEST: ${bestScore}`;
gameLoop();
