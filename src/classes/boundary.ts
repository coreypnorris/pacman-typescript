import { Position } from "./position";

// Define classes.
export class Boundary {
  static staticWidth = 40;
  static staticHeight = 40;
  width: number;
  height: number;
  position: Position;
  image: CanvasImageSource;
  
  constructor(positionX: number, positionY: number, image: CanvasImageSource) {
    this.position = new Position(positionX, positionY);
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'blue';
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    context.drawImage(this.image, this.position.x, this.position.y);
  }
}