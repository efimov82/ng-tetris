class Particle {
  private alpha = 1;

  constructor(
    private ctx: CanvasRenderingContext2D | null,
    private x: number,
    private y: number,
    private radius: number,
    private dx: number,
    private dy: number
  ) {
    // this.x = x;
    // this.y = y;
    // this.radius = radius;
    // this.dx = dx;
    // this.dy = dy;
    // this.alpha = 1;
  }
  draw() {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.fillStyle = 'green';

    /* Begins or reset the path for
         the arc created */
    this.ctx.beginPath();

    /* Some curve is created*/
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    this.ctx.fill();

    /* Restore the recent canvas context*/
    this.ctx.restore();
  }

  update() {
    this.draw();
    this.alpha -= 0.01;
    this.x += this.dx;
    this.y += this.dy;
  }
}
