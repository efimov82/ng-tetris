import { Heap } from './Heap';
import { Rectangle } from './Rectangle';
import { Box, Line } from './shapes';

fdescribe('Heap', () => {
  const velocity = { x: 0, y: 0 };
  const cellSize = 30;
  let heap: Heap;

  beforeEach(() => {
    heap = new Heap(10, 12);
  });

  fit('should add shape to heap', () => {
    let pos = { x: 0, y: 270 };
    const line = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    expect(heap.add(line)).toBeTruthy();
    const field10 = heap.getField(10);

    field10.forEach((cell) => {
      if (cell && cell instanceof Rectangle) {
        expect(cell.getId()).toEqual(line.getId());
      }
    });
  });

  fit('should not add shape to not null cell', () => {
    let pos = { x: 0, y: 270 };
    const line = new Line(null, pos, 'red', velocity, cellSize, cellSize);
    expect(heap.add(line)).toBeTruthy();

    pos = { x: 60, y: 270 };
    const line2 = new Line(null, pos, 'red', velocity, cellSize, cellSize);
    expect(heap.add(line2)).toBeFalsy();

    const field10 = heap.getField(10);

    field10.forEach((cell) => {
      if (cell && cell instanceof Rectangle) {
        expect(cell.getId()).toEqual(line.getId());
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

  fit('should remove 2 complited lines', () => {
    let pos = { x: 0, y: 240 };
    const box1 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 60, y: 240 };
    const box2 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 120, y: 240 };
    const box3 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 180, y: 240 };
    const box4 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 240, y: 240 };
    const box5 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 300, y: 240 };
    const box6 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    expect(heap.add(box1)).toBeTruthy();
    expect(heap.add(box2)).toBeTruthy();
    expect(heap.add(box3)).toBeTruthy();
    expect(heap.add(box4)).toBeTruthy();
    expect(heap.add(box5)).toBeTruthy();
    expect(heap.add(box6)).toBeTruthy();

    expect(heap.removeCompletedLines()).toBe(2);
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

  fit('should move down all cells after remove line', () => {
    let pos = { x: 0, y: 270 };
    const line1 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 120, y: 270 };
    const line2 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 240, y: 270 };
    const line3 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    // box
    const originY = 210;
    pos = { x: 240, y: originY };
    const box1 = new Box(null, pos, 'green', velocity, cellSize, cellSize);

    expect(heap.add(line1)).toBeTruthy();
    expect(heap.add(line2)).toBeTruthy();
    expect(heap.add(line3)).toBeTruthy();
    expect(heap.add(box1)).toBeTruthy();

    expect(heap.removeCompletedLines()).toBe(1);
    const field = heap.getField();

    field.forEach((line) => {
      if (line instanceof Array) {
        line.forEach((cell) => {
          if (cell && cell.getId() === box1.getId()) {
            expect(cell.getPosition().y).toBeGreaterThan(originY);
          } else {
            expect(cell).toBeNull();
          }
        });
      } else {
        expect(true).toBeFalse();
      }
    });
  });

  fit('should move down all cells after remove line #2', () => {
    let pos = { x: 0, y: 270 };
    const line1 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 120, y: 270 };
    const line2 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 240, y: 240 };
    const box1 = new Box(null, pos, 'green', velocity, cellSize, cellSize);

    pos = { x: 300, y: 240 };
    const box2 = new Box(null, pos, 'black', velocity, cellSize, cellSize);

    expect(heap.add(line1)).toBeTruthy();
    expect(heap.add(line2)).toBeTruthy();
    expect(heap.add(box1)).toBeTruthy();
    expect(heap.add(box2)).toBeTruthy();

    expect(heap.removeCompletedLines()).toBe(1);

    const fieldLine9 = heap.getField(9);

    fieldLine9.forEach((cell) => {
      expect(cell).toBeNull();
    });
  });

  fit('should correct add shape after removing line', () => {
    let pos = { x: 0, y: 270 };
    const line1 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 120, y: 270 };
    const line2 = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    pos = { x: 240, y: 240 };
    const box1 = new Box(null, pos, 'green', velocity, cellSize, cellSize);

    pos = { x: 300, y: 240 };
    const box2 = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    expect(heap.add(line1)).toBeTruthy();
    expect(heap.add(line2)).toBeTruthy();
    expect(heap.add(box1)).toBeTruthy();
    expect(heap.add(box2)).toBeTruthy();

    expect(heap.removeCompletedLines()).toBe(1);

    pos = { x: 240, y: 240 };
    const line3 = new Line(null, pos, 'black', velocity, cellSize, cellSize);
    expect(heap.add(line3)).toBeTruthy();
  });
});
