import { Rectangle } from "./Rectangle";
import { Shape } from "./shapes/Shape";

export class Heap {
  private field: Rectangle[] = [];
  private touchTop = false;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private fieldWidth: number,
    private fieldHeight: number,
    private cellSize: number = 30
  ) {}

  public detectCollisions(obj: Rectangle): boolean {
    let result = false;
    const position = obj.getPosition();

    this.field.forEach((rect) => {
      if (rect.detectCollisions(obj)) {
        result = true;
        return;
      }
    });

    if (result) {
      return result;
    }

    if (position.y + obj.getHeight() >= this.fieldHeight) {
      return true;
    }

    return result;
  }

  public isTouchTop(): boolean {
    return this.touchTop;
  }

  public add(obj: Shape): void {
    const rects = obj.getRectangles();
    rects.forEach((rect) => {
      rect.setVelocity({ x: 0, y: 0 });

      if (rect.getPosition().y <= 0) {
        this.touchTop = true;
      }
      this.field.push(rect);
    });
  }

  public draw(): void {
    this.field.forEach((rect) => {
      rect.draw();
    });
  }
}
