// js/flyingSaucer.js
import { ObstacleBase } from "./obstacleBase.js";
import {
  FLYING_SAUCER_MIN_SPEED,
  FLYING_SAUCER_MAX_SPEED,
  POINTS_FLYING_SAUCER
} from "./config.js";

const flyingSaucerConfig = {
  src: "assets/png/enemyUFO.png", 
  width: 91,   // Largura da imagem 
  height: 91,  // Altura da imagem 
  minSpeed: FLYING_SAUCER_MIN_SPEED,
  maxSpeed: FLYING_SAUCER_MAX_SPEED,
  points: POINTS_FLYING_SAUCER, // 20 pontos
  type: "flyingSaucer"
};

export class FlyingSaucer extends ObstacleBase {
  constructor() {
    super(flyingSaucerConfig);
  }
}