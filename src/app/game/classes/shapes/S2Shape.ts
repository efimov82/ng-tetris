import { Shape } from './Shape';

export class S2Shape extends Shape {
  public getWidth(): number {
    if (this.isVertical) {
      return this.width * 2;
    } else {
      return this.width * 3;
    }
  }

  public getHeight(): number {
    if (this.isVertical) {
      return this.height * 3;
    } else {
      return this.height * 2;
    }
  }

  protected initCells(): void {
    this.cells = [];
    if (this.isVertical) {
      this.cells.push(this.createCell(30, 0));
      this.cells.push(this.createCell(0, 30));
      this.cells.push(this.createCell(30, 30));
      this.cells.push(this.createCell(0, 60));
    } else {
      this.cells.push(this.createCell(0, 0));
      this.cells.push(this.createCell(30, 0));
      this.cells.push(this.createCell(30, 30));
      this.cells.push(this.createCell(60, 30));
    }
  }
}
