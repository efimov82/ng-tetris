import { Shape } from "./Shape";

export class Line extends Shape {
  public getWidth(): number {
    return this.width * 4;
  }

  public getHeight(): number {
    return this.height;
  }
  protected initCells(): void {
    this.cells = [];
    this.cells.push(this.createCell(0, 0));
    this.cells.push(this.createCell(30, 0));
    this.cells.push(this.createCell(60, 0));
    this.cells.push(this.createCell(90, 0));
  }
}
