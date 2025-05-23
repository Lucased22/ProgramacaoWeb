import { TAMX, TAMY } from "./config.js";

class Space {
  constructor() {
    this.element = document.getElementById("space");
    this.element.style.width = `${TAMX}px`;
    this.element.style.height = `${TAMY}px`;
    this.element.style.backgroundPositionY = "0px";
  }
  move() {
    
    let currentY = parseInt(this.element.style.backgroundPositionY);
    currentY = (currentY + 1) % (2 * TAMY) ; 
    this.element.style.backgroundPositionY = `${currentY}px`;
  }
}

export const space = new Space();