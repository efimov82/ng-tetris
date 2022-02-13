export interface Velocity {
  x: number;
  y: number;
}

export interface Position {
  x: number;
  y: number;
}

export class Rectangle {
  constructor(
    private shapeId: string,
    private ctx: CanvasRenderingContext2D | null,
    private position: Position,
    private width: number,
    private height: number,
    private color: string,
    private velocity: Velocity
  ) {}

  public update() {
    this.draw();
    this.position.y += this.velocity.y;
  }

  public draw() {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.rect(this.position.x, this.position.y, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    this.ctx.strokeStyle = 'grey';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  public detectCollisions(obj: Rectangle): boolean {
    const position = obj.getPosition();
    return (
      this.position.x === position.x &&
      this.position.y <= position.y + obj.getHeight()
    );
  }

  public getId(): string {
    return this.shapeId;
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(pos: Position) {
    this.position = pos;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setVelocity(velocity: Velocity): void {
    this.velocity = velocity;
  }
}
