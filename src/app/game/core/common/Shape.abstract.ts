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
    protected width: number,
    protected height: number
  ) {
    this.id = uuidv4();
    this.initCells();
  }

  public getName(): string {
    return this.name;
  }

  public update(moveDown = true) {
    this.draw();

    if (moveDown) {
      this.position.y += this.width * this.velocity.y;
    }
    this.initCells();
  }

  public draw() {
    this.cells.forEach((rectangle, index) => {
      rectangle.update();
    });
  }

  public moveLeft() {
    if (this.position.x - this.width >= 0) {
      this.position.x -= this.width;
      this.initCells();
    }
  }

  public moveRight() {
    if (!this.ctx) return;

    if (
      this.position.x + this.width + this.getWidth() <=
      this.ctx.canvas.width
    ) {
      this.position.x += this.width;
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
          this.width,
          this.height,
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

  public setVelocity(velocity: Velocity): void {
    this.velocity = velocity;
  }

  public rotate(): void {
    this.isVertical = !this.isVertical;
  }

  public getFuturePositionLeft(): Position[] {
    const res: Position[] = [];
    this.cells.forEach((rect) => {
      const newPos: Position = {
        x: rect.getPosition().x,
        y: rect.getPosition().y,
      };
      newPos.x -= this.width;
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
      newPos.x += this.width;
      res.push(newPos);
    });

    return res;
  }

  protected createCell(x: number, y: number): Rectangle {
    return new Rectangle(
      this.id,
      this.ctx,
      { x: this.position.x + x, y: this.position.y + y },
      this.width,
      this.height,
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
