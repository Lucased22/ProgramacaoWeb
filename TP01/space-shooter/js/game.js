import {
  FPS,
  TAMX,
  TAMY,
  PLAYER_LIVES,
  PROB_ENEMY_SHIP,
  PROB_FLYING_SAUCER,
  PROB_LARGE_ASTEROID,
  PROB_SMALL_ASTEROID,
  SPEED_INCREASE_INTERVAL,
  SPEED_INCREASE_PERCENTAGE
} from "./config.js"; 

import { space } from "./space.js"; 
import { ship } from "./ship.js"; 
import { EnemyShip } from "./enemyShip.js"; 
import { FlyingSaucer } from "./flyingSaucer.js"; 
import { LargeMeteor } from "./largeMeteor.js"; 
import { smallMeteor } from "./smallMeteor.js"; 
import { Shot } from "./shot.js"; 

const scoreDisplay = document.getElementById("score-display");
const livesDisplay = document.getElementById("lives-display");
const gameOverMessage = document.getElementById("game-over-message");
const restartButton = document.getElementById("restart-button");
const pauseMessage = document.getElementById("pause-message");
const startMessage = document.getElementById("start-message");

let score = 0;
let lives = PLAYER_LIVES;
let gameState = "initial"; // "initial", "playing", "paused", "gameOver"
let obstacles = [];
let shots = [];

let gameLoopInterval = null;
let playerMoveDirection = 0; 

// Aumento de dificuldade
let gameTimeElapsed = 0; 
let lastSpeedIncreaseTimeMarker = 0; 
let speedMultiplier = 1.0;


function init() {
  resetGameVariables();
  gameState = "initial"; 
  // Limpa qualquer loop anterior para evitar múltiplos loops rodando
  if (gameLoopInterval) clearInterval(gameLoopInterval);
  gameLoopInterval = setInterval(run, 1000 / FPS);
}

function updateScoreDisplay() {
  scoreDisplay.textContent = `Score: ${String(score).padStart(7, '0')}`; 
}

function updateLivesDisplay() { 
  livesDisplay.innerHTML = ""; 
  for (let i = 0; i < lives; i++) {
    const lifeImg = document.createElement("img");
    lifeImg.src = "assets/png/life.png"; 
    livesDisplay.appendChild(lifeImg);
  }
}

function resetGameVariables() {
  score = 0;
  lives = PLAYER_LIVES;
  obstacles.forEach(obstacle => obstacle.remove()); 
  obstacles = [];
  shots.forEach(shot => shot.remove()); 
  shots = [];
  ship.reset(); 
  
  gameTimeElapsed = 0;
  lastSpeedIncreaseTimeMarker = 0;
  speedMultiplier = 1.0;

  updateScoreDisplay();
  updateLivesDisplay();
  gameOverMessage.style.display = "none";
  pauseMessage.style.display = "none";
  startMessage.style.display = "block";
  space.element.style.backgroundPositionY = "0px"; 
}

window.addEventListener("keydown", (e) => {
  if (gameState === "initial" && e.key === " ") {
    e.preventDefault(); 
    gameState = "playing";
    startMessage.style.display = "none";
    gameTimeElapsed = 0; 
    lastSpeedIncreaseTimeMarker = 0;
    return; 
  }


  if (e.key.toLowerCase() === "p") { 
    if (gameState === "playing") {
      gameState = "paused";
      pauseMessage.style.display = "block";
    } else if (gameState === "paused") {
      gameState = "playing";
      pauseMessage.style.display = "none";
    }
    return;
  }

  if (gameState === "playing") {
    if (e.key === "ArrowLeft") {
      playerMoveDirection = -1;
    } else if (e.key === "ArrowRight") {
      playerMoveDirection = 1;
    } else if (e.key === " ") { 
      e.preventDefault(); 
      shots.push(ship.fire());
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (gameState === "playing") {
    if (e.key === "ArrowLeft" && playerMoveDirection === -1) {
      playerMoveDirection = 0;
     
    } else if (e.key === "ArrowRight" && playerMoveDirection === 1) {
      playerMoveDirection = 0;
    
    }
  }
});

restartButton.addEventListener("click", () => {
  init(); // Reinicia o jogo completamente
});

function createRandomObstacle() {
  const rand = Math.random(); 
  if (rand < PROB_ENEMY_SHIP) {
    obstacles.push(new EnemyShip());
  } else if (rand < PROB_ENEMY_SHIP + PROB_FLYING_SAUCER) {
    obstacles.push(new FlyingSaucer());
  } else if (rand < PROB_ENEMY_SHIP + PROB_FLYING_SAUCER + PROB_LARGE_ASTEROID) {
    obstacles.push(new LargeMeteor());
  } else if (rand < PROB_ENEMY_SHIP + PROB_FLYING_SAUCER + PROB_LARGE_ASTEROID + PROB_SMALL_ASTEROID) {
    obstacles.push(new smallMeteor());
  }
}

function checkCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||   
    rect1.left > rect2.right ||   
    rect1.bottom < rect2.top ||  
    rect1.top > rect2.bottom      
  );
}

function handleCollisions() {
  for (let i = shots.length - 1; i >= 0; i--) { 
    const shot = shots[i];
    for (let j = obstacles.length - 1; j >= 0; j--) {
      const obstacle = obstacles[j];
      if (checkCollision(shot.element, obstacle.element)) {
        score += obstacle.points; 
        updateScoreDisplay();

        obstacle.remove(); 
        obstacles.splice(j, 1); 
        
        shot.remove();    
        shots.splice(i, 1);      
        break;
      }
    }
  }

if (!ship.isInvulnerable) { 
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obstacle = obstacles[i];
      if (checkCollision(ship.element, obstacle.element)) {
        if (ship.takeDamage()) { 
          lives--;
          updateLivesDisplay();
          obstacle.remove();
          obstacles.splice(i, 1);

          if (lives <= 0) { // Game Over 
            gameState = "gameOver";
            gameOverMessage.style.display = "block"; // Mostra mensagem de Game Over
            return;
          }
        }
        break; 
      }
    }
  }
}

function updateGameDifficulty() {
  gameTimeElapsed += (1000 / FPS); 
  if (gameTimeElapsed - lastSpeedIncreaseTimeMarker >= SPEED_INCREASE_INTERVAL) {
    speedMultiplier *= (1 + SPEED_INCREASE_PERCENTAGE);
    lastSpeedIncreaseTimeMarker = gameTimeElapsed;     
    console.log("Dificuldade aumentada! Multiplicador de velocidade:", speedMultiplier.toFixed(2));
  }
}


function run() {
  if (gameState === "initial") {
    space.move(); 
    return;
  }
  
  if (gameState === "paused" || gameState === "gameOver") {
    return;
  }

  updateGameDifficulty(); 

  space.move();   
  ship.move(playerMoveDirection); 
  
  createRandomObstacle();
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];
    obstacle.move(speedMultiplier); 
    if (obstacle.isOffScreen()) { 
      obstacle.remove();     
      obstacles.splice(i, 1);  
    }
  }


  for (let i = shots.length - 1; i >= 0; i--) {
    const shot = shots[i];
    shot.move();
    if (shot.isOffScreen()) {
      shot.remove();        
      shots.splice(i, 1);     
    }
  }

  handleCollisions(); 
}

// Inicia o jogo 
init();