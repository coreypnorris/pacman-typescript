import { Position } from "./position";

export class PowerUp {
  position: Position;
  radius: number;

  constructor(positionX: number, positionY: number) {
    this.position = new Position(positionX, positionY);
    this.radius = 8;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  }
}