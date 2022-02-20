export enum Shapes {
  Line = 'Line',
  Box = 'Box',
  LShape = 'LShape',
  TShape = 'TShape',
  S1Shape = 'S1Shape',
  S2Shape = 'S2Shape',
  L2Shape = 'L2Shape',
}

export type Color<T> = {
  base: T;
  highlight: T;
};

export interface Velocity {
  x: number;
  y: number;
}

export interface Position {
  x: number;
  y: number;
}
