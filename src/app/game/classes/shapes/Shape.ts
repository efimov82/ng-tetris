import { Position, Rectangle, Velocity } from "../Rectangle";

export abstract class Shape {
  protected cells: Rectangle[] = [];
  protected downVelocity = 0;

  constructor(
    protected ctx: CanvasRenderingContext2D,
    protected position: Position,
    protected color: string,
    protected velocity: Velocity,
    protected width: number,
    protected height: number
  ) {
    this.initCells();
  }

  public update() {
    this.draw();

    // if (this.downVelocity) {
    //   this.downVelocity += 2;
    // }
    this.position.y += this.velocity.y + this.downVelocity;
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
    if (
      this.position.x + this.width + this.getWidth() <=
      this.ctx.canvas.width
    ) {
      this.position.x += this.width;
      this.initCells();
    }
  }

  public moveDownStart() {
    this.downVelocity = 1;
  }
  public moveDownStop() {
    this.downVelocity = 0;
  }

  public getPosition(): Position {
    return this.position;
  }

  public getRectangles(): Rectangle[] {
    return this.cells;
  }

  public setVelocity(velocity: Velocity): void {
    this.velocity = velocity;
  }

  protected createCell(x: number, y: number): Rectangle {
    return new Rectangle(
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
