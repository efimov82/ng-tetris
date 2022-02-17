import { Shape } from './Shape';

export class Line extends Shape {
  protected name = 'Line';

  public getWidth(): number {
    if (this.isVertical) {
      return this.width;
    } else {
      return this.width * 4;
    }
  }

  public getHeight(): number {
    if (this.isVertical) {
      return this.height * 4;
    } else {
      return this.height;
    }
  }
  protected initCells(): void {
    this.cells = [];

    if (this.isVertical) {
      this.cells.push(this.createCell(0, 0));
      this.cells.push(this.createCell(0, 30));
      this.cells.push(this.createCell(0, 60));
      this.cells.push(this.createCell(0, 90));
    } else {
      this.cells.push(this.createCell(0, 0));
      this.cells.push(this.createCell(30, 0));
      this.cells.push(this.createCell(60, 0));
      this.cells.push(this.createCell(90, 0));
    }
  }
}
