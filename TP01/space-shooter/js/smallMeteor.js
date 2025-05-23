// js/smallAsteroid.js
import { ObstacleBase } from "./obstacleBase.js";
import {
  SMALL_ASTEROID_MIN_SPEED,
  SMALL_ASTEROID_MAX_SPEED,
  POINTS_SMALL_ASTEROID
} from "./config.js";

const smallAsteroidConfig = {
  src: "assets/png/meteorSmall.png", 
  width: 44,  // Largura 
  height: 42, // Altura 
  minSpeed: SMALL_ASTEROID_MIN_SPEED,
  maxSpeed: SMALL_ASTEROID_MAX_SPEED,
  points: POINTS_SMALL_ASTEROID, // 100 pontos
  type: "smallAsteroid"
};

export class SmallAsteroid extends ObstacleBase {
  constructor() {
    super(smallAsteroidConfig);
  }
}