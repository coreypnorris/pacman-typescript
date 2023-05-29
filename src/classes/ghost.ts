import { Position } from "./position";
import { Velocity } from "./velocity";

export class Ghost {
  static speed = 2;
  position: Position;
  velocity: Velocity;
  radius: number;
  color: string;
  speed: number;
  prevCollisions: string[];
  scared: boolean;

  constructor(positionX: number, positionY: number, velocityX: number, velocityY: number, color: string = 'crimson' ) {
    this.position = new Position(positionX, positionY);
    this.velocity = new Velocity(velocityX, velocityY);
    this.radius = 15;
    this.color = color;
    this.prevCollisions = [];
    this.speed = 2;
    this.scared = false;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.scared ? 'blue' : this.color;
    context.fill();
    context.closePath();
  }

  update(context: CanvasRenderingContext2D) {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}