import { Shape } from './Shape';

export class LShape extends Shape {
  protected name = 'L';
  private orintation: number = 0;

  public getWidth(): number {
    if (this.orintation === 0 || this.orintation === 2) {
      return this.width * 2;
    } else {
      return this.width * 3;
    }
  }

  public getHeight(): number {
    if (this.orintation === 0 || this.orintation === 2) {
      return this.height * 3;
    } else {
      return this.height * 2;
    }
  }

  public override rotate() {
    this.orintation === 3 ? (this.orintation = 0) : this.orintation++;
  }

  protected initCells(): void {
    this.cells = [];
    switch (this.orintation) {
      case 0:
        this.cells.push(this.createCell(0, 0));
        this.cells.push(this.createCell(0, 30));
        this.cells.push(this.createCell(0, 60));
        this.cells.push(this.createCell(30, 60));
        break;
      case 1:
        this.cells.push(this.createCell(60, 0));
        this.cells.push(this.createCell(0, 30));
        this.cells.push(this.createCell(30, 30));
        this.cells.push(this.createCell(60, 30));
        break;
      case 2:
        this.cells.push(this.createCell(0, 0));
        this.cells.push(this.createCell(30, 0));
        this.cells.push(this.createCell(30, 30));
        this.cells.push(this.createCell(30, 60));
        break;
      case 3:
        this.cells.push(this.createCell(0, 0));
        this.cells.push(this.createCell(0, 30));
        this.cells.push(this.createCell(30, 0));
        this.cells.push(this.createCell(60, 0));
        break;
    }
  }
}
