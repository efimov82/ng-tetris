import { Shape } from '../common/Shape.abstract';

export class TShape extends Shape {
  protected name = 'TShape';

  public getWidth(): number {
    if (this.orintation === 0 || this.orintation === 2) {
      return this.cellSize * 3;
    } else {
      return this.cellSize * 2;
    }
  }

  public getHeight(): number {
    if (this.orintation === 0 || this.orintation === 2) {
      return this.cellSize * 2;
    } else {
      return this.cellSize * 3;
    }
  }

  public override rotate() {
    this.orintation === 3 ? (this.orintation = 0) : this.orintation++;
  }

  protected initCells(): void {
    this.cells = [];
    switch (this.orintation) {
      case 0:
        this.cells.push(this.createCell(this.cellSize, 0));
        this.cells.push(this.createCell(0, this.cellSize));
        this.cells.push(this.createCell(this.cellSize, this.cellSize));
        this.cells.push(this.createCell(this.cellSize * 2, this.cellSize));
        break;
      case 1:
        this.cells.push(this.createCell(0, 0));
        this.cells.push(this.createCell(this.cellSize, -this.cellSize));
        this.cells.push(this.createCell(this.cellSize, 0));
        this.cells.push(this.createCell(this.cellSize, this.cellSize));
        break;
      case 2:
        this.cells.push(this.createCell(0, 0));
        this.cells.push(this.createCell(this.cellSize, 0));
        this.cells.push(this.createCell(this.cellSize * 2, 0));
        this.cells.push(this.createCell(this.cellSize, this.cellSize));
        break;
      case 3:
        this.cells.push(this.createCell(0, 0));
        this.cells.push(this.createCell(0, this.cellSize));
        this.cells.push(this.createCell(0, this.cellSize * 2));
        this.cells.push(this.createCell(this.cellSize, this.cellSize));
        break;
      default:
        throw new Error(`Wrong orintation: ${this.orintation}`);
    }
  }
}
