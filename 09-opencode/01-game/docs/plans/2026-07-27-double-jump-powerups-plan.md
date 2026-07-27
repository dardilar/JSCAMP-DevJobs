# Double Jump & Powerups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add double jump mechanic and 4 powerup types (Shield, Slow Motion, Score Multiplier, Magnet) to Neon Dash.

**Architecture:** All changes go into the existing `game.js` file plus minor HTML/CSS additions for the powerup HUD. The game uses a single-file architecture with canvas rendering - we follow that pattern.

**Tech Stack:** Vanilla JavaScript, HTML5 Canvas, CSS

---

## File Map

| File | Changes |
|------|---------|
| `game.js` | Add jump counter, powerup system, collectible orbs, rendering changes |
| `index.html` | Add powerup HUD container |
| `styles.css` | Style powerup HUD element |

---

### Task 1: Add Double Jump Mechanic

**Files:**
- Modify: `game.js:29-38` (player object)
- Modify: `game.js:190-204` (jump function)

- [ ] **Step 1: Add jump tracking to player object**

Add `jumpsLeft` and `maxJumps` properties to the player object at line ~37:

```javascript
const player = {
    x: 100,
    y: 0,
    size: 30,
    velocityY: 0,
    gravity: 0.55,
    jumpForce: -12.5,
    isGrounded: false,
    trail: [],
    jumpsLeft: 0,
    maxJumps: 2
};
```

- [ ] **Step 2: Modify jump function to support double jump**

Replace the `jump()` function (lines 190-204) with:

```javascript
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
```

- [ ] **Step 3: Reset jumpsLeft when grounded**

In the `update()` function, find the ground collision block (lines 306-310) and add the reset:

```javascript
if (player.y + player.size >= groundY) {
    player.y = groundY - player.size;
    player.velocityY = 0;
    player.isGrounded = true;
    player.jumpsLeft = player.maxJumps;
}
```

- [ ] **Step 4: Reset jumpsLeft in startGame()**

In `startGame()` (line ~221), add after `player.isGrounded = false;`:

```javascript
player.jumpsLeft = player.maxJumps;
```

- [ ] **Step 5: Test double jump manually**

Open the game in a browser. Verify:
- Press space once to jump normally (cyan particles)
- Press space again in air for second jump (yellow particles, weaker)
- Cannot triple jump
- Jumps reset on landing

---

### Task 2: Add Powerup HUD to HTML/CSS

**Files:**
- Modify: `index.html` (after score display)
- Modify: `styles.css`

- [ ] **Step 1: Add powerup HUD element to HTML**

In `index.html`, add inside `#ui-overlay` after `#best-score-display`:

```html
<div id="powerup-hud" class="hidden">
    <div id="powerup-icon"></div>
    <div id="powerup-bar-container">
        <div id="powerup-bar"></div>
    </div>
</div>
```

- [ ] **Step 2: Add powerup HUD styles to CSS**

Add to end of `styles.css`:

```css
#powerup-hud {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    pointer-events: none;
}

#powerup-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px currentColor;
}

#powerup-bar-container {
    width: 100px;
    height: 8px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    overflow: hidden;
}

#powerup-bar {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    transition: width 0.1s linear;
}
```

---

### Task 3: Add Powerup Data Structures and Spawn Logic

**Files:**
- Modify: `game.js` (add new arrays and spawn function)
- Modify: `game.js:40-46` (near other game state variables)

- [ ] **Step 1: Add powerup state variables**

After the existing game state variables (around line 46), add:

```javascript
let powerups = [];
let activePowerup = null;
let powerupTimer = 0;
let collectibleOrbs = [];
```

- [ ] **Step 2: Add powerup type definitions**

After the variables above, add:

```javascript
const POWERUP_TYPES = [
    { name: 'shield', color: '#0f0', duration: 300 },
    { name: 'slowmo', color: '#00f', duration: 240 },
    { name: 'multiplier', color: '#ff0', duration: 240 },
    { name: 'magnet', color: '#f0f', duration: 300 }
];
```

(Durations in frames: 300 = ~5s, 240 = ~4s at 60fps)

- [ ] **Step 3: Create spawnPowerup() function**

Add this function after `spawnObstacle()`:

```javascript
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
```

- [ ] **Step 4: Add spawn chance to update loop**

In the `update()` function, after the obstacle spawn block (line ~301), add:

```javascript
if (Math.random() < 0.03) {
    spawnPowerup();
}
```

- [ ] **Step 5: Reset powerups in startGame()**

In `startGame()`, add after clearing other arrays:

```javascript
powerups = [];
activePowerup = null;
powerupTimer = 0;
collectibleOrbs = [];
```

---

### Task 4: Add Powerup Collection and Active Effect Logic

**Files:**
- Modify: `game.js` (update function additions)

- [ ] **Step 1: Add powerup movement and collection in update()**

In `update()`, add a new block after the obstacle collision loop (after line 333):

```javascript
// Update powerups
powerups.forEach(pu => {
    pu.x -= gameSpeed;
    pu.bobOffset += 0.05;
});
powerups = powerups.filter(pu => pu.x > -50);

// Check powerup collection
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
```

- [ ] **Step 2: Create activatePowerup() function**

Add this function:

```javascript
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
```

- [ ] **Step 3: Add powerup timer countdown in update()**

Add at the start of the `update()` function (after the `if (gameState !== 'playing') return;` check):

```javascript
if (activePowerup) {
    powerupTimer--;
    const bar = document.getElementById('powerup-bar');
    bar.style.width = (powerupTimer / activePowerup.duration * 100) + '%';
    if (powerupTimer <= 0) {
        activePowerup = null;
        document.getElementById('powerup-hud').classList.add('hidden');
    }
}
```

- [ ] **Step 4: Apply shield effect to collision detection**

Wrap the existing obstacle collision block (lines 325-332) in a condition:

```javascript
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
```

- [ ] **Step 5: Apply slow motion effect**

In the game speed calculation (line ~294), modify:

```javascript
let speedMultiplier = (activePowerup && activePowerup.name === 'slowmo') ? 0.5 : 1;
gameSpeed = (6 + Math.min(score * 0.15, 10)) * speedMultiplier;
```

- [ ] **Step 6: Apply score multiplier effect**

In the score increment block (line ~281), modify:

```javascript
const scoreAmount = (activePowerup && activePowerup.name === 'multiplier') ? 2 : 1;
score += scoreAmount;
```

And update the popup text:

```javascript
text: '+' + scoreAmount,
```

- [ ] **Step 7: Add collectible orb updates in update()**

After the powerup collection logic, add:

```javascript
// Update collectible orbs (from magnet powerup)
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
    // Check collection
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
```

---

### Task 5: Add Pickup Sound Effect

**Files:**
- Modify: `game.js` (add sound function)

- [ ] **Step 1: Add playPickupSound() function**

Add after `playNearMissSound()`:

```javascript
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
```

---

### Task 6: Add Powerup Rendering

**Files:**
- Modify: `game.js` (draw function additions)

- [ ] **Step 1: Add powerup rendering in draw()**

In the `draw()` function, add after the obstacles rendering block (after line 431):

```javascript
// Draw powerups
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

// Draw collectible orbs
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
```

- [ ] **Step 2: Add shield visual effect when active**

In the player rendering section, after the existing player draw code (after line 416), add:

```javascript
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
```

- [ ] **Step 3: Add slow motion visual overlay**

In `draw()`, before the `ctx.restore()` call, add:

```javascript
if (activePowerup && activePowerup.name === 'slowmo') {
    ctx.fillStyle = 'rgba(0, 0, 80, 0.15)';
    ctx.fillRect(0, 0, width, height);
}
```

---

### Task 7: Reset Powerup HUD on Game Start

**Files:**
- Modify: `game.js` (startGame function)

- [ ] **Step 1: Hide powerup HUD in startGame()**

In `startGame()`, add at the beginning of the reset logic:

```javascript
document.getElementById('powerup-hud').classList.add('hidden');
```

---

### Task 8: Final Integration Test

- [ ] **Step 1: Test all features together**

Open game in browser and verify:
- Double jump works (2 jumps max, resets on ground)
- Powerups spawn occasionally as floating colored squares
- Shield: green glow, immune to obstacles for 5s
- Slow Motion: game slows to 50%, blue overlay
- Score Multiplier: score increases by 2, "+2" popups
- Magnet: purple orbs spawn and drift toward player
- Powerup HUD shows active powerup with timer bar
- All effects end correctly after duration
- Game over still works when no shield is active
- Score and best score still save correctly
