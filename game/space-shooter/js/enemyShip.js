import { ObstacleBase } from "./obstacleBase.js";
import { ENEMY_SHIP_MIN_SPEED, ENEMY_SHIP_MAX_SPEED, POINTS_ENEMY_SHIP, TAMX } from "./config.js";

const enemyShipConfig = {
  src: "assets/png/enemyShip.png", 
  width: 98, 
  height: 50,
  minSpeed: ENEMY_SHIP_MIN_SPEED,
  maxSpeed: ENEMY_SHIP_MAX_SPEED,
  points: POINTS_ENEMY_SHIP,
  type: "enemyShip"
};

export class EnemyShip extends ObstacleBase {
  constructor() {
    super(enemyShipConfig);
  }
  
}