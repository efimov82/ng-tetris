import { Shape } from '../common/Shape.abstract';

export class Box extends Shape {
  protected name = 'Box';

  public getWidth(): number {
    return this.cellSize * 2;
  }

  public getHeight(): number {
    return this.cellSize * 2;
  }

  protected initCells(): void {
    this.cells = [];
    this.cells.push(this.createCell(0, 0));
    this.cells.push(this.createCell(0, this.cellSize));
    this.cells.push(this.createCell(this.cellSize, 0));
    this.cells.push(this.createCell(this.cellSize, this.cellSize));
  }
}
