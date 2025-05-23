// js/largeAsteroid.js
import { ObstacleBase } from "./obstacleBase.js";
import {
  LARGE_METEOR_MIN_SPEED,
  LARGE_METEOR_MAX_SPEED,
  POINTS_LARGE_METEOR
} from "./config.js";

const largeMeteorConfig = {
  src: "assets/png/meteorBig.png",
  width: 136,  // Largura 
  height: 111, // Altura 
  minSpeed: LARGE_METEOR_MIN_SPEED,
  maxSpeed: LARGE_METEOR_MAX_SPEED,
  points: POINTS_LARGE_METEOR, // 10 pontos
  type: "largeAsteroid"
};

export class LargeMeteor extends ObstacleBase {
  constructor() {
    super(largeMeteorConfig);
  }
}