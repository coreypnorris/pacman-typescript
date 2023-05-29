import { Position } from "./position";
import { Velocity } from "./velocity";

export class Circle {
  position: Position;
  velocity: Velocity;
  radius: number;

  constructor(positionX: number, positionY: number, velocityX: number, velocityY: number, radius: number) {
    this.position = new Position(positionX, positionY);
    this.velocity = new Velocity(velocityX, velocityY);
    this.radius = radius;
  }
}