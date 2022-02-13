import { Heap } from './Heap';
import { Box, Line } from './shapes';

fdescribe('Heap', () => {
  const velocity = { x: 0, y: 0 };
  const cellSize = 30;
  let heap: Heap;

  beforeEach(() => {
    heap = new Heap(10, 12);
  });

  fit('should remove complited line', () => {
    let pos = { x: 0, y: 270 };
    const line1 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 120, y: 270 };
    const line2 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 240, y: 270 };
    const line3 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    heap.add(line1);
    heap.add(line2);
    heap.add(line3);
    expect(heap.removeCompletedLines()).toBe(1);
    const field = heap.getField();

    field.forEach((line) => {
      if (line instanceof Array) {
        line.forEach((cell) => {
          expect(cell).toBeNull();
        });
      } else {
        expect(true).toBeFalse();
      }
    });
  });

  fit('should allow move left', () => {
    let pos = { x: 0, y: 240 };
    const box1 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    const pos2 = { x: 120, y: 60 };
    const box2 = new Box(null, pos2, 'red', velocity, cellSize, cellSize);

    heap.add(box1);
    heap.add(box2);

    expect(heap.isAllowedMoveLeft(box2)).toBeTrue();
  });

  fit('should not allow move left', () => {
    let pos = { x: 0, y: 240 };
    const box1 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 60, y: 220 };
    const box2 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    heap.add(box1);
    heap.add(box2);

    expect(heap.isAllowedMoveLeft(box2)).toBeFalse();
  });

  fit('should allow move right', () => {
    let pos = { x: 90, y: 120 };
    const box1 = new Box(null, pos, 'red', velocity, 30, 30);

    pos = { x: 30, y: 10 };
    const box2 = new Box(null, pos, 'red', velocity, 30, 30);

    heap.add(box1);
    heap.add(box2);

    expect(heap.isAllowedMoveRight(box2)).toBeTrue();
  });

  fit('should not allow move right', () => {
    let pos = { x: 90, y: 120 };
    const box1 = new Box(null, pos, 'red', velocity, 30, 30);

    pos = { x: 30, y: 110 };
    const box2 = new Box(null, pos, 'red', velocity, 30, 30);

    heap.add(box1);
    heap.add(box2);

    expect(heap.isAllowedMoveRight(box2)).toBeFalse();
  });
});
