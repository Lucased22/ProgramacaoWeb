import { ObstacleBase } from "./obstacleBase.js";
import {
  SMALL_METEOR_MIN_SPEED,
  SMALL_METEOR_MAX_SPEED,
  POINTS_SMALL_METEOR
} from "./config.js";

const smallMeteorConfig = {
  src: "assets/png/meteorSmall.png", 
  width: 44,  // Largura 
  height: 42, // Altura 
  minSpeed: SMALL_METEOR_MIN_SPEED,
  maxSpeed: SMALL_METEOR_MAX_SPEED,
  points: POINTS_SMALL_METEOR, // 100 pontos
  type: "smallMeteor"
};

export class smallMeteor extends ObstacleBase {
  constructor() {
    super(smallMeteorConfig);
  }
}