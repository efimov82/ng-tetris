import { Shape } from '../common/Shape.abstract';

export class Line extends Shape {
  protected name = 'Line';

  public getWidth(): number {
    if (this.isVertical) {
      return this.cellSize;
    } else {
      return this.cellSize * 4;
    }
  }

  public getHeight(): number {
    if (this.isVertical) {
      return this.cellSize * 4;
    } else {
      return this.cellSize;
    }
  }
  protected initCells(): void {
    this.cells = [];

    if (this.isVertical) {
      this.cells.push(this.createCell(0, 0));
      this.cells.push(this.createCell(0, this.cellSize));
      this.cells.push(this.createCell(0, this.cellSize * 2));
      this.cells.push(this.createCell(0, this.cellSize * 3));
    } else {
      this.cells.push(this.createCell(0, 0));
      this.cells.push(this.createCell(this.cellSize, 0));
      this.cells.push(this.createCell(this.cellSize * 2, 0));
      this.cells.push(this.createCell(this.cellSize * 3, 0));
    }
  }
}
