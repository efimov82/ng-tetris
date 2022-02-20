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
import { Color, Shapes } from './types';
import { getRandomInt } from './utils';

export class ShapeFactory {
  static createRandome(ctx: CanvasRenderingContext2D, cellSize: number): Shape {
    const colorIndex = getRandomInt(COLORS.size);
    const shapeIndex = getRandomInt(SHAPES_LIST.size);
    const color = COLORS.get(colorIndex) || {
      base: 'DeepPink',
      highlight: 'LightPink',
    };

    const nextShape = ShapeFactory.create(
      SHAPES_LIST.get(shapeIndex),
      ctx,
      color,
      cellSize
    );

    return nextShape;
  }

  static create(
    name: Shapes | string | undefined,
    ctx: CanvasRenderingContext2D,
    color: Color<string>,
    cellSize: number,
    position = { x: 120, y: 0 },
    velocity = { x: 0, y: 1 }
  ): Shape {
    if (typeof name === 'string') {
      name = ShapeFactory.getShapeTypeName(name);
    }

    switch (name) {
      case Shapes.Line:
        return new Line(ctx, position, color, velocity, cellSize);
      case Shapes.Box:
        return new Box(ctx, position, color, velocity, cellSize);
      case Shapes.LShape:
        return new LShape(ctx, position, color, velocity, cellSize);
      case Shapes.TShape:
        return new TShape(ctx, position, color, velocity, cellSize);
      case Shapes.S1Shape:
        return new S1Shape(ctx, position, color, velocity, cellSize);
      case Shapes.S2Shape:
        return new S2Shape(ctx, position, color, velocity, cellSize);
      case Shapes.L2Shape:
        return new L2Shape(ctx, position, color, velocity, cellSize);
      default:
        throw new Error(`Can't create Shape by name: ${name}`);
    }
  }

  static getShapeTypeName(className: string): Shapes {
    switch (className) {
      case 'Line':
        return Shapes.Line;
      case 'Box':
        return Shapes.Box;
      case 'LShape':
        return Shapes.LShape;
      case 'TShape':
        return Shapes.TShape;
      case 'S1Shape':
        return Shapes.S1Shape;
      case 'S2Shape':
        return Shapes.S2Shape;
      case 'L2Shape':
        return Shapes.L2Shape;
      default:
        throw new Error('Unknown shape name ' + className);
    }
  }
}
