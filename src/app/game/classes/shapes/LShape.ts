import { Shape } from "./Shape";

export class LShape extends Shape {
  public getWidth(): number {
    return this.width * 2;
  }

  public getHeight(): number {
    return this.height * 3;
  }

  protected initCells(): void {
    this.cells = [];
    this.cells.push(this.createCell(0, 0));
    this.cells.push(this.createCell(0, 30));
    this.cells.push(this.createCell(0, 60));
    this.cells.push(this.createCell(30, 60));
  }
}
