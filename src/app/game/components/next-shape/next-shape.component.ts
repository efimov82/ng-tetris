import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Shape } from '../../core/common/Shape.abstract';
import { ShapeFactory } from '../../core/common/ShapeFactory';

@Component({
  selector: 'next-shape',
  templateUrl: './next-shape.component.html',
  styleUrls: ['./next-shape.component.scss'],
})
export class NextShapeComponent implements OnInit, OnChanges {
  @Input() nextItems!: Shape[] | null;

  @ViewChild('nextShapeCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private cellSize = 20;

  ngOnInit() {
    this.canvas.nativeElement.width = 120;
    this.canvas.nativeElement.height = 240;

    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges) {
    const nextItems = changes['nextItems'].currentValue;
    if (!nextItems) return;

    const rects: Shape[] = [];
    let y = this.cellSize;

    nextItems.forEach((shape: Shape, index: number) => {
      if (this.ctx) {
        const shapeName = shape.getName();
        const x = this.getPositionX(shapeName);
        const smallShape = ShapeFactory.create(
          shapeName,
          this.ctx,
          shape.getColor(),
          this.cellSize,
          { x, y }
        );

        y += smallShape.getHeight() + this.cellSize;
        rects.push(smallShape);
      }
    });

    this.draw(rects);
  }

  private getPositionX(name: string): number {
    switch (name) {
      case 'Line':
        return this.cellSize;
      case 'Box':
      case 'LShape':
      case 'L2Shape':
        return this.cellSize * 2;
      default:
        return this.cellSize * 1.5;
    }
  }

  private draw(shapes: Shape[]) {
    if (!this.ctx) return;

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    shapes.forEach((shape) => {
      shape.draw();
    });
  }
}
