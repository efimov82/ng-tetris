import { Rectangle } from './Rectangle';
import { Shape } from './shapes/Shape';

export class Heap {
  private field: (Rectangle | null)[][] = [];
  private touchTop = false;

  constructor(
    private rows: number,
    private cols: number,
    private cellSize: number = 30
  ) {
    for (let i = 1; i <= rows; i++) {
      this.field[i] = [];
      for (let j = 1; j <= cols; j++) {
        this.field[i][j] = null;
      }
    }
  }

  public isTouchTop(): boolean {
    return this.touchTop;
  }

  public detectCollisions(rect: Rectangle): boolean {
    let result = false;

    const [row, col] = this.getHeapCords(rect);

    if (row === this.rows) {
      return true;
    }

    this.field.forEach((line) => {
      line.forEach((cell) => {
        if (cell) {
          const [cellRow, cellCol] = this.getHeapCords(cell);

          if (row + 1 === cellRow && col === cellCol) {
            result = true;
            return;
          }
        }
      });
    });

    return result;
  }

  public add(obj: Shape): void {
    const rects = obj.getRectangles();
    rects.forEach((rect) => {
      const [row, col] = this.getHeapCords(rect);

      rect.setVelocity({ x: 0, y: 0 });
      if (rect.getPosition().y <= 0) {
        this.touchTop = true;
        return;
      }

      this.field[row][col] = rect;
    });
  }

  public getField(row?: number): (Rectangle | null)[] | (Rectangle | null)[][] {
    if (row) {
      return this.field[row];
    }
    return this.field;
  }

  public isAllowedMoveLeft(): boolean {
    // TODO
    return true;
  }

  public isAllowedMoveRight(): boolean {
    // TODO
    return true;
  }

  public removeCompletedLines(): number {
    const linesForDelete: number[] = [];
    for (let i = this.rows; i > 0; i--) {
      let isLineCompleted = true;
      for (let j = 1; j < this.cols; j++) {
        if (this.field[i][j] === null) {
          isLineCompleted = false;
          break;
        }
      }

      if (isLineCompleted) {
        linesForDelete.push(i);
      }
    }

    this.cleanupField(linesForDelete);
    return linesForDelete.length;
  }

  public draw(): void {
    this.field.forEach((row) => {
      row.forEach((rect) => {
        if (rect) {
          rect.draw();
        }
      });
    });
  }

  protected cleanupField(linesForDelete: number[]) {
    linesForDelete.forEach((i) => {
      console.log('delete line:', i);
      for (let j = 0; j < this.cols; j++) {
        this.field[i][j] = null;
      }

      this.moveDownAllFrom(i - 1);
    });
  }

  protected moveDownAllFrom(lineNum: number): void {
    for (let i = lineNum; i > 0; i--) {
      for (let j = 1; j < this.cols; j++) {
        const newPos = this.field[i][j]?.getPosition();
        if (newPos !== undefined) {
          newPos.y += this.cellSize;
          this.field[i][j]?.setPosition(newPos);
        }
      }
    }
  }

  protected getHeapCords(rect: Rectangle): [number, number] {
    const x = rect.getPosition().x;
    const y = Math.floor(rect.getPosition().y / this.cellSize) * this.cellSize;

    const row = y / this.cellSize + 1;
    const col = x / this.cellSize;

    return [row, col];
  }
}
