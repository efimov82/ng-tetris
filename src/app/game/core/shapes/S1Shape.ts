import { Shape } from '../common/Shape.abstract';

export class S1Shape extends Shape {
  protected name = 'S1Shape';

  public getWidth(): number {
    if (this.isVertical) {
      return this.cellSize * 2;
    } else {
      return this.cellSize * 3;
    }
  }

  public getHeight(): number {
    if (this.isVertical) {
      return this.cellSize * 3;
    } else {
      return this.cellSize * 2;
    }
  }

  protected initCells(): void {
    this.cells = [];

    if (this.isVertical) {
      this.cells.push(this.createCell(0, 0));
      this.cells.push(this.createCell(0, this.cellSize));
      this.cells.push(this.createCell(this.cellSize, this.cellSize));
      this.cells.push(this.createCell(this.cellSize, this.cellSize * 2));
    } else {
      this.cells.push(this.createCell(this.cellSize, 0));
      this.cells.push(this.createCell(0, this.cellSize));
      this.cells.push(this.createCell(this.cellSize, this.cellSize));
      this.cells.push(this.createCell(this.cellSize * 2, 0));
    }
  }
}
