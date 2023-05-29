import { Position } from "./position";

export class Rectangle {
  position: Position;
  width: number;
  height: number;
  
  constructor(positionX: number, positionY: number, width: number, height: number) {
    this.position = new Position(positionX, positionY);
    this.width = width;
    this.height = height;
  }
}