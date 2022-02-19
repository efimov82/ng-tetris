import { v4 as uuidv4 } from 'uuid';
import { Rectangle } from './Rectangle';
import { Position, Velocity } from './types';

export abstract class Shape {
  protected id: string;
  protected cells: Rectangle[] = [];
  protected isVertical = false;
  protected orintation = 0;

  protected abstract name: string;

  constructor(
    protected ctx: CanvasRenderingContext2D | null,
    protected position: Position,
    protected color: string,
    protected velocity: Velocity,
    protected cellSize: number
  ) {
    this.id = uuidv4();
    this.initCells();
  }

  public getName(): string {
    return this.name;
  }

  public update(moveDown = true) {
    if (moveDown) {
      this.position.y += this.cellSize * this.velocity.y;
    }
    this.initCells();
    this.draw();
  }

  public draw() {
    this.cells.forEach((rectangle, index) => {
      rectangle.draw();
    });
  }

  public moveLeft() {
    if (this.position.x - this.cellSize >= 0) {
      this.position.x -= this.cellSize;
      this.initCells();
    }
  }

  public moveRight() {
    if (!this.ctx) return;

    if (
      this.position.x + this.cellSize + this.getWidth() <=
      this.ctx.canvas.width
    ) {
      this.position.x += this.cellSize;
      this.initCells();
    }
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(position: Position) {
    this.position = position;
  }

  public getRectangles(): Rectangle[] {
    return this.cells;
  }

  public getFutureRectangles(): Rectangle[] {
    let res: Rectangle[] = [];
    this.cells.forEach((rect) => {
      res.push(
        new Rectangle(
          this.id,
          this.ctx,
          rect.getPosition(),
          this.cellSize,
          this.cellSize,
          this.color,
          {
            x: 0,
            y: 0,
          }
        )
      );
    });

    return res;
  }

  public getId(): string {
    return this.id;
  }

  public getColor(): string {
    return this.color;
  }

  public setVelocity(velocity: Velocity): void {
    this.velocity = velocity;
  }

  public rotate(): void {
    // TODO check allow rotate
    this.isVertical = !this.isVertical;
  }

  public getFuturePositionLeft(): Position[] {
    const res: Position[] = [];
    this.cells.forEach((rect) => {
      const newPos: Position = {
        x: rect.getPosition().x,
        y: rect.getPosition().y,
      };
      newPos.x -= this.cellSize;
      res.push(newPos);
    });

    return res;
  }

  public getFuturePositionRight(): Position[] {
    const res: Position[] = [];
    this.cells.forEach((rect) => {
      const newPos: Position = {
        x: rect.getPosition().x,
        y: rect.getPosition().y,
      };
      newPos.x += this.cellSize;
      res.push(newPos);
    });

    return res;
  }

  protected createCell(x: number, y: number): Rectangle {
    return new Rectangle(
      this.id,
      this.ctx,
      { x: this.position.x + x, y: this.position.y + y },
      this.cellSize,
      this.cellSize,
      this.color,
      {
        x: 0,
        y: this.velocity.y,
      }
    );
  }

  public abstract getWidth(): number;
  public abstract getHeight(): number;

  protected abstract initCells(): void;
}
