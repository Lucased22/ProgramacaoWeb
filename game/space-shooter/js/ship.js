import { TAMX, PLAYER_INVULNERABILITY_TIME } from "./config.js"; 
import { space } from "./space.js"; 
import { Shot } from "./shot.js"; 

const directions = [
  "assets/png/playerLeft.png", 
  "assets/png/player.png", 
  "assets/png/playerRight.png", 
];
const damagedPlayerImage = "assets/png/playerDamaged.png";

class Ship {
  constructor() {
    this.element = document.createElement("img");
    this.element.id = "ship";
    this.direction = 1; // 0: left, 1: straight, 2: right
    this.element.src = directions[this.direction];
    this.width = 99; 
    this.height = 75; 
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.element.style.bottom = "20px";
    this.x = TAMX / 2 - this.width / 2;
    this.y = space.element.offsetHeight - this.height - 20; 
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`; 

    this.isInvulnerable = false;
    this.invulnerabilityTimer = null;

    space.element.appendChild(this.element);
  }

  changeDirection(giro) {
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro;
    if (!this.isInvulnerable) { 
        this.element.src = directions[this.direction];
    }
  }

  move(dx) { 
    const speed = 5; 
    let newX = this.x + dx * speed;

    if (newX < 0) {
      newX = 0;
    } else if (newX + this.width > TAMX) {
      newX = TAMX - this.width;
    }
    this.x = newX;
    this.element.style.left = `${this.x}px`;
  }

  fire() {
    const shotX = this.x + this.width / 2 - 2.5; 
    const shotY = this.y; 
    return new Shot(shotX, shotY);
  }

  takeDamage() { 
    if (this.isInvulnerable) return false; 

    this.element.src = "assets/png/playerDamaged.png"; 
    this.isInvulnerable = true;
    
    if (this.invulnerabilityTimer) clearTimeout(this.invulnerabilityTimer);

    this.invulnerabilityTimer = setTimeout(() => {
      this.isInvulnerable = false;
      this.element.src = directions[this.direction]; 
    }, PLAYER_INVULNERABILITY_TIME);
    return true; 
  }

  reset() { // Para reiniciar o jogo
    this.direction = 1;
    this.element.src = directions[this.direction];
    this.x = TAMX / 2 - this.width / 2;
    this.y = space.element.offsetHeight - this.height - 20;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.isInvulnerable = false;
    if (this.invulnerabilityTimer) clearTimeout(this.invulnerabilityTimer);
  }
}

export const ship = new Ship();