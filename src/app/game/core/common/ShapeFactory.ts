import {
  Box,
  L2Shape,
  Line,
  LShape,
  S1Shape,
  S2Shape,
  TShape,
} from '../shapes';
import { COLORS, SHAPES_LIST } from './constants';
import { Shape } from './Shape.abstract';
import { Shapes } from './types';
import { getRandomInt } from './utils';

export class ShapeFactory {
  static createRandome(ctx: CanvasRenderingContext2D, cellSize: number): Shape {
    const colorIndex = getRandomInt(COLORS.size);
    const shapeIndex = getRandomInt(SHAPES_LIST.size);
    const color = COLORS.get(colorIndex) || 'red';

    const nextShape = ShapeFactory.create(
      SHAPES_LIST.get(shapeIndex),
      ctx,
      color,
      cellSize
    );

    return nextShape;
  }

  static create(
    name: Shapes | undefined,
    ctx: CanvasRenderingContext2D,
    color: string,
    cellSize: number
  ): Shape {
    const position = { x: 120, y: 0 };
    const velocity = { x: 0, y: 1 };

    switch (name) {
      case Shapes.Line:
        return new Line(ctx, position, color, velocity, cellSize, cellSize);
      case Shapes.Box:
        return new Box(ctx, position, color, velocity, cellSize, cellSize);
      case Shapes.LShape:
        return new LShape(ctx, position, color, velocity, cellSize, cellSize);
      case Shapes.TShape:
        return new TShape(ctx, position, color, velocity, cellSize, cellSize);
      case Shapes.S1Shape:
        return new S1Shape(ctx, position, color, velocity, cellSize, cellSize);
      case Shapes.S2Shape:
        return new S2Shape(ctx, position, color, velocity, cellSize, cellSize);
      case Shapes.L2Shape:
        return new L2Shape(ctx, position, color, velocity, cellSize, cellSize);
      default:
        throw new Error(`Can't create Shape by name: ${name}`);
    }
  }
}
