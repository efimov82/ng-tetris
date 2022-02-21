import { Color, Shapes } from './types';

export const SHAPES_LIST: Map<number, Shapes> = new Map([
  [0, Shapes.Line],
  [1, Shapes.Box],
  [2, Shapes.LShape],
  [3, Shapes.TShape],
  [4, Shapes.S1Shape],
  [5, Shapes.S2Shape],
  [6, Shapes.L2Shape],
]);

export const COLORS: Map<number, Color<string>> = new Map([
  [0, { base: 'OrangeRed', highlight: 'Orange' }],
  [1, { base: 'Green', highlight: 'SpringGreen' }],
  [2, { base: 'RoyalBlue', highlight: 'SkyBlue' }],
  [3, { base: 'DarkViolet', highlight: 'Violet' }],
  [4, { base: 'DodgerBlue', highlight: 'Cyan' }],
  [5, { base: 'Orange', highlight: 'Moccasin' }],
  [6, { base: 'Brown', highlight: 'LightCoral' }],
  [7, { base: 'DarkGoldenRod', highlight: 'Yellow' }],
  [8, { base: 'Chocolate', highlight: 'BlanchedAlmond' }],
  [9, { base: 'DeepPink', highlight: 'LightPink' }],
]);

export enum SOUND {
  gameStarted = 'levelUp.wav',
  addShape = 'addToHeap.wav',
  removeLine = 'removeLine.wav',
  levelUp = 'levelUp.wav',
  hardDrop = 'hardDrop.wav',
  gameOver = 'gameOver.wav',
}
