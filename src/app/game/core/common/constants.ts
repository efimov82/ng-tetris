import { Shapes } from './types';

export const SHAPES_LIST: Map<number, Shapes> = new Map([
  [0, Shapes.Line],
  [1, Shapes.Box],
  [2, Shapes.LShape],
  [3, Shapes.TShape],
  [4, Shapes.S1Shape],
  [5, Shapes.S2Shape],
  [6, Shapes.L2Shape],
]);

export const COLORS: Map<number, string> = new Map([
  [0, 'OrangeRed'],
  [1, 'green'],
  [2, 'RoyalBlue'],
  [3, 'purple'],
  [4, 'SeaGreen'],
  [5, 'orange'],
  [6, 'Maroon'],
  [7, 'olive'],
  [8, 'chocolate'],
]);
