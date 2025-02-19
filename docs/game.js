// Game state
const state = {
    player: {
        x: 400,
        y: 300,
        angle: 0,
        speed: 5,
        turnSpeed: 0.1,
        moveSpeed: 5,
        sprite: new Image()
    },
    keys: {
        forward: false,
        backward: false,
        turnLeft: false,
        turnRight: false,
        strafeLeft: false,
        strafeRight: false
    }
};

// Initialize canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load assets
state.player.sprite.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGUlEQVQYV2NkYGD4z4AHMP7//x8/BYyjAQCmBQYNBzg8PQAAAABJRU5ErkJggg==';

function spawnEnemy() {
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    switch(edge) {
        case 0: x = Math.random() * canvas.width; y = -32; break;
        case 1: x = canvas.width + 32; y = Math.random() * canvas.height; break;
        case 2: x = Math.random() * canvas.width; y = canvas.height + 32; break;
        case 3: x = -32; y = Math.random() * canvas.height; break;
    }
    state.enemies.push({ x, y, speed: 2 });
}

function spawnCoin() {
    state.coins.push({
        x: Math.random() * (canvas.width - 20),
        y: Math.random() * (canvas.height - 20)
    });
}

function updateGame() {
    // Update player rotation
    if (state.keys.turnLeft) state.player.angle -= state.player.turnSpeed;
    if (state.keys.turnRight) state.player.angle += state.player.turnSpeed;

    // Calculate movement vector
    const dx = Math.cos(state.player.angle);
    const dy = Math.sin(state.player.angle);

    // Forward/backward movement
    if (state.keys.forward) {
        state.player.x += dx * state.player.moveSpeed;
        state.player.y += dy * state.player.moveSpeed;
    }
    if (state.keys.backward) {
        state.player.x -= dx * state.player.moveSpeed;
        state.player.y -= dy * state.player.moveSpeed;
    }

    // Strafe movement
    if (state.keys.strafeLeft) {
        state.player.x += dy * state.player.moveSpeed;
        state.player.y -= dx * state.player.moveSpeed;
    }
    if (state.keys.strafeRight) {
        state.player.x -= dy * state.player.moveSpeed;
        state.player.y += dx * state.player.moveSpeed;
    }

    // Keep player in bounds
    state.player.x = Math.max(0, Math.min(canvas.width, state.player.x));
    state.player.y = Math.max(0, Math.min(canvas.height, state.player.y));
}

function drawGame() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.drawImage(state.player.sprite, state.player.x - 16, state.player.y - 16);

    // Draw enemies
    ctx.fillStyle = '#f00';
    state.enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 16, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw coins
    ctx.fillStyle = '#ff0';
    state.coins.forEach(coin => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, 8, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw score
    ctx.fillStyle = '#fff';
    ctx.font = '16px "Press Start 2P"';
    ctx.fillText(`Coins: ${state.player.coins}`, 10, 30);
}

// Input handling
window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'w': state.keys.forward = true; break;
        case 's': state.keys.backward = true; break;
        case 'a': state.keys.strafeLeft = true; break;
        case 'd': state.keys.strafeRight = true; break;
        case 'ArrowLeft': state.keys.turnLeft = true; break;
        case 'ArrowRight': state.keys.turnRight = true; break;
    }
});

window.addEventListener('keyup', e => {
    switch(e.key) {
        case 'w': state.keys.forward = false; break;
        case 's': state.keys.backward = false; break;
        case 'a': state.keys.strafeLeft = false; break;
        case 'd': state.keys.strafeRight = false; break;
        case 'ArrowLeft': state.keys.turnLeft = false; break;
        case 'ArrowRight': state.keys.turnRight = false; break;
    }
});

// Shop functionality
function openShop() {
    // TODO: Implement shop UI
    console.log('Shop opened');
}

// Game loop
function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// Spawn enemies and coins periodically
setInterval(spawnEnemy, 3000);
setInterval(spawnCoin, 5000);

// Start game
gameLoop();
