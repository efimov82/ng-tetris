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
    private velocity: Velocity,
    private radius = 4
  ) {}

  public update() {
    this.position.y += this.width; // * this.velocity.y;
    this.draw();
  }

  public draw() {
    if (!this.ctx) return;

    const radius = {
      tl: this.radius,
      tr: this.radius,
      br: this.radius,
      bl: this.radius,
    };

    const x = this.position.x;
    const y = this.position.y;
    this.ctx.beginPath();

    this.ctx.moveTo(x + radius.tl, y);
    this.ctx.lineTo(x + this.width - radius.tr, y);
    this.ctx.quadraticCurveTo(x + this.width, y, x + this.width, y + radius.tr);
    this.ctx.lineTo(x + this.width, y + this.height - radius.br);
    this.ctx.quadraticCurveTo(
      x + this.width,
      y + this.height,
      x + this.width - radius.br,
      y + this.height
    );
    this.ctx.lineTo(x + radius.bl, y + this.height);
    this.ctx.quadraticCurveTo(
      x,
      y + this.height,
      x,
      y + this.height - radius.bl
    );
    this.ctx.lineTo(x, y + radius.tl);
    this.ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    this.ctx.closePath();

    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
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
