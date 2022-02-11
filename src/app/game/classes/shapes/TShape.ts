import { Shape } from "./Shape";

export class TShape extends Shape {
  public getWidth(): number {
    return this.width * 3;
  }

  public getHeight(): number {
    return this.height * 2;
  }

  protected initCells(): void {
    this.cells = [];
    this.cells.push(this.createCell(30, 0));
    this.cells.push(this.createCell(0, 30));
    this.cells.push(this.createCell(30, 30));
    this.cells.push(this.createCell(60, 30));
  }
}
