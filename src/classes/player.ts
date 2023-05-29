import { Position } from "./position";
import { Velocity } from "./velocity";

export class Player {
  position: Position;
  velocity: Velocity;
  radius: number;
  radians: number;
  openRate: number;
  rotation: number;

  constructor(positionX: number, positionY: number, velocityX: number, velocityY: number) {
    this.position = new Position(positionX, positionY);
    this.velocity = new Velocity(velocityX, velocityY);
    this.radius = 15;
    this.radians = 0.75;
    this.openRate = 0.12;
    this.rotation = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.translate(-this.position.x, -this.position.y);
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians
    );
    context.lineTo(this.position.x, this.position.y);
    context.fillStyle = 'yellow';
    context.fill();
    context.closePath();
    context.restore();
  }

  update(context: CanvasRenderingContext2D) {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.radians < 0 || this.radians > 0.75) {
      this.openRate = -this.openRate;
    }

    this.radians += this.openRate;
  }
}