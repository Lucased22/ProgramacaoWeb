
import { space } from "./space.js";
import { TAMY } from "./config.js";
import { TAMX } from "./config.js";

export class ObstacleBase {
  constructor(config) {
    this.element = document.createElement("img");
    this.element.src = config.src;
    this.element.className = "obstacle"; 
    this.element.style.position = "absolute";
    
    this.width = config.width;
    this.height = config.height;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.x = parseInt(Math.random() * (TAMX - this.width));
    this.y = -this.height; 
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    this.speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
    this.points = config.points;
    this.type = config.type; 

    space.element.appendChild(this.element);
  }

  move(speedMultiplier = 1) { 
    this.y += this.speed * speedMultiplier;
    this.element.style.top = `${this.y}px`;
  }

  isOffScreen() {
    return this.y > TAMY;
  }

  remove() {
    if (this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}