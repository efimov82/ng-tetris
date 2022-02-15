import { v4 as uuidv4 } from 'uuid';
import { Position, Rectangle, Velocity } from '../Rectangle';

export abstract class Shape {
  protected id: string;
  protected cells: Rectangle[] = [];
  // protected downVelocity = 0;
  protected isVertical = false;

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

  // public moveDownStart() {
  //   this.downVelocity = 1;
  // }
  // public moveDownStop() {
  //   this.downVelocity = 0;
  // }

  public getPosition(): Position {
    return this.position;
  }

  public getRectangles(): Rectangle[] {
    return this.cells;
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
