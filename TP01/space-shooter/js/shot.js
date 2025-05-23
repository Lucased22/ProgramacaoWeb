// js/shot.js
import { space } from "./space.js";
import { TAMY, SHOT_SPEED } from "./config.js";

export class Shot {
  constructor(startX, startY) {
    this.element = document.createElement("img");
    this.element.src = "assets/png/laserGreen.png";
    this.element.className = "shot"; 
    this.element.style.position = "absolute";
    

    this.width = 9; 
    this.height = 33; 
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.x = startX;
    this.y = startY;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    
    this.speed = SHOT_SPEED;

    space.element.appendChild(this.element);
  }

  move() {
    this.y -= this.speed;
    this.element.style.top = `${this.y}px`;
  }

  
  isOffScreen() {
    return this.y < -this.height; 
  }

  remove() {
    if (this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
  }
}