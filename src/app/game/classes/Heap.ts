import { Position, Rectangle } from './Rectangle';
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

  public add(obj: Shape): boolean {
    let res = true;
    const rects = obj.getRectangles();
    if (!this.isPossibleAdd(obj)) {
      return false;
    }

    rects.forEach((rect) => {
      const [row, col] = this.getHeapCords(rect);
      rect.setVelocity({ x: 0, y: 0 });
      if (rect.getPosition().y <= 0) {
        this.touchTop = true;
        return;
      }

      this.field[row][col] = rect;
    });

    return res;
  }

  public getField(row?: number): (Rectangle | null)[] | (Rectangle | null)[][] {
    if (row) {
      return this.field[row];
    }
    return this.field;
  }

  public removeCompletedLines(): number {
    const linesForDelete: number[] = [];
    for (let i = this.rows; i > 0; i--) {
      let isLineCompleted = true;
      for (let j = 1; j <= this.cols; j++) {
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

  public draw(current: Shape | undefined): void {
    this.field.forEach((row) => {
      row.forEach((rect) => {
        if (rect) {
          rect.draw();
        }
      });
    });

    if (current) {
      const futureRects = this.getAvatar(current);
      futureRects.forEach((rect) => {
        rect.draw(false, rect.getColor());
      });
    }
  }

  public isAllowedMoveLeft(obj: Shape): boolean {
    const futureRects = obj.getFuturePositionLeft();
    return this.isAllowedMove(obj.getId(), futureRects);
  }

  public isAllowedMoveRight(obj: Shape): boolean {
    const futureRects = obj.getFuturePositionRight();
    return this.isAllowedMove(obj.getId(), futureRects);
  }

  public getAvatar(current: Shape): Rectangle[] {
    let rects = current.getFutureRectangles();

    for (let y = 1; y <= this.rows; y++) {
      rects.forEach((rect) => {
        let pos = rect.getPosition();
        pos.y += this.cellSize;

        rect.setPosition(pos);
      });

      if (!this.isPossibleAddRects(rects)) {
        break;
      }
    }

    rects.forEach((rect) => {
      let pos = rect.getPosition();
      pos.y -= this.cellSize;
      rect.setPosition(pos);
    });

    return rects;
  }

  protected isAllowedMove(objectId: string, position: Position[]): boolean {
    let res = true;

    position.forEach((rect) => {
      const [row, col] = this.getHeapCords(rect);

      if (this.field[row] && this.field[row][col]) {
        const cell = this.field[row][col];
        if (cell !== null && cell.getId() !== objectId) {
          res = false;
          return;
        }
      }
    });

    return res;
  }

  protected isPossibleAdd(obj: Shape): boolean {
    return this.isPossibleAddRects(obj.getRectangles());
  }

  protected isPossibleAddRects(rects: Rectangle[]): boolean {
    let res = true;

    rects.forEach((rect) => {
      const [row, col] = this.getHeapCords(rect);
      if (row < 0) return;
      // console.log('isPossibleAddRects:', rect.getPosition().y, row, col);
      if (
        row < 1 ||
        row > this.rows ||
        col < 1 ||
        col > this.cols ||
        this.field[row][col] !== null
      ) {
        res = false;
        return;
      }
    });

    return res;
  }

  protected cleanupField(linesForDelete: number[]) {
    linesForDelete.forEach((i) => {
      console.log('delete line:', i);
      for (let j = 1; j <= this.cols; j++) {
        this.field[i][j] = null;
      }
    });

    this.moveDownAllFrom(linesForDelete[0] - 1, linesForDelete.length);
  }

  protected moveDownAllFrom(lineNum: number, countLines: number): void {
    for (let i = lineNum; i > 0; i--) {
      for (let j = 1; j <= this.cols; j++) {
        if (this.field[i][j] !== null) {
          const rect = this.field[i][j];
          if (rect) {
            const pos = rect.getPosition();
            pos.y += this.cellSize * countLines;
            rect.setPosition(pos);

            this.field[i][j] = null;
            this.field[i + countLines][j] = rect;
          }
        }
      }
    }
  }

  /**
   *
   * @param rect Rectangle | Position
   * @returns [row, col]
   */
  protected getHeapCords(rect: Rectangle | Position): [number, number] {
    let x, y: number;

    if (rect instanceof Rectangle) {
      x = rect.getPosition().x;
      y = Math.floor(rect.getPosition().y / this.cellSize) * this.cellSize;
    } else {
      x = rect.x;
      y = Math.floor(rect.y / this.cellSize) * this.cellSize;
    }

    let row = y / this.cellSize + 1;
    const col = x / this.cellSize + 1;

    // if (row > this.rows) {
    //   row = this.rows;
    // }

    return [row, col];
  }
}
