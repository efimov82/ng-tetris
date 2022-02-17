import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Position, Rectangle } from '../../classes/Rectangle';
import { Shape } from '../../classes/shapes';

@Component({
  selector: 'next-shape',
  templateUrl: './next-shape.component.html',
  styleUrls: ['./next-shape.component.scss'],
})
export class NextShapeComponent implements OnInit, OnChanges {
  @Input() next!: Shape | null | undefined;

  @ViewChild('nextShapeCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;

  ngOnInit() {
    this.canvas.nativeElement.width = 120;
    this.canvas.nativeElement.height = 120;

    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges) {
    const next = changes['next'].currentValue;
    if (!next) return;

    const rects: Rectangle[] = [];
    const velocity = { x: 0, y: 0 };

    next['cells'].forEach((originRect: Rectangle) => {
      const rect = new Rectangle(
        originRect.getId(),
        this.ctx,
        this.getPosition(originRect.getPosition()),
        originRect.getWidth(),
        originRect.getHeight(),
        originRect.getColor(),
        velocity
      );

      rects.push(rect);
    });

    this.draw(rects);
  }

  private draw(rects: Rectangle[]) {
    if (!this.ctx) return;

    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    rects.forEach((rect) => {
      rect.draw();
    });
  }

  private getPosition(originPosition: Position): Position {
    const position = { x: 120, y: -30 };

    return {
      x: originPosition.x - position.x,
      y: originPosition.y - position.y,
    };
  }
}
