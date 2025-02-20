import { GAME_CONFIG } from './utils.js';
import { checkWallCollision } from './map.js';

export const player = {
    x: 1.5,
    y: 1.5,
    angle: 0,
    fov: GAME_CONFIG.FOV,
    speed: GAME_CONFIG.PLAYER_SPEED * 0.5,
    turnSpeed: 0.05,
    velocity: { x: 0, y: 0 },
    acceleration: 0.01,
    friction: 0.9,
    health: 100,
    maxHealth: 100,
    arms: {
        swingOffset: 0,
        swingSpeed: 0.1
    }
};

export function updatePlayerMovement(keys) {
    if (keys.w) {
        const newX = player.x + Math.cos(player.angle) * player.speed;
        const newY = player.y + Math.sin(player.angle) * player.speed;
        if (!checkWallCollision(newX, newY)) {
            player.x = newX;
            player.y = newY;
        }
    }
    if (keys.s) {
        const newX = player.x - Math.cos(player.angle) * player.speed;
        const newY = player.y - Math.sin(player.angle) * player.speed;
        if (!checkWallCollision(newX, newY)) {
            player.x = newX;
            player.y = newY;
        }
    }
    if (keys.a) {
        player.angle -= 0.05;  // Reduced turn sensitivity
    }
    if (keys.d) {
        player.angle += 0.05;  // Reduced turn sensitivity
    }
}

export function shoot(state) {
    const now = Date.now();
    if (now - state.lastShot >= state.shootCooldown) {
        state.projectiles.push({
            x: player.x,
            y: player.y,
            angle: player.angle,
            speed: 0.5
        });
        state.lastShot = now;
    }
}
