import { Heap } from './Heap';
import { Rectangle } from './common/Rectangle';
import { Box, Line } from './shapes';

fdescribe('Heap', () => {
  const velocity = { x: 0, y: 0 };
  const cellSize = 30;
  let heap: Heap;

  beforeEach(() => {
    heap = new Heap(10, 12);
  });

  fit('should add shape', () => {
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

  fit('should not add shape to not empty cell', () => {
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
    // second try
    expect(heap.removeCompletedLines()).toBe(0);

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

  fit('should remove mixed lines', () => {
    // first complited line
    let pos = { x: 0, y: 270 };
    heap.add(new Line(null, pos, 'red', velocity, cellSize, cellSize));

    pos = { x: 120, y: 270 };
    heap.add(new Line(null, pos, 'red', velocity, cellSize, cellSize));

    pos = { x: 240, y: 270 };
    heap.add(new Line(null, pos, 'red', velocity, cellSize, cellSize));

    // middle uncompleted line
    const line1 = new Line(
      null,
      { x: 30, y: 240 },
      'blue',
      velocity,
      cellSize,
      cellSize
    );
    heap.add(line1);

    // second complited line
    pos = { x: 0, y: 210 };
    heap.add(new Line(null, pos, 'red', velocity, cellSize, cellSize));

    pos = { x: 120, y: 210 };
    heap.add(new Line(null, pos, 'red', velocity, cellSize, cellSize));

    pos = { x: 240, y: 210 };
    heap.add(new Line(null, pos, 'red', velocity, cellSize, cellSize));

    expect(heap.removeCompletedLines()).toBe(2);
    const field = heap.getField(10);

    let countCells = 0;
    field.forEach((cell) => {
      if (cell instanceof Rectangle) {
        expect(cell?.getId()).toEqual(line1.getId());
        expect(cell?.getPosition().y).toEqual(270);
        countCells++;
      }
    });
    expect(countCells).toEqual(4);
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

  fit('should add shape after removing line', () => {
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

  fit('should return shape avatar on bottom', () => {
    const pos = { x: 120, y: 0 };
    const box = new Box(null, pos, 'red', velocity, cellSize, cellSize);

    const rects = heap.getAvatar(box);

    expect(rects.length).toBe(4);
    expect(rects[0].getPosition()).toEqual({ x: 120, y: 240 });
    expect(rects[1].getPosition()).toEqual({ x: 120, y: 270 });
    expect(rects[2].getPosition()).toEqual({ x: 150, y: 240 });
    expect(rects[3].getPosition()).toEqual({ x: 150, y: 270 });

    box.update(true);

    expect(rects[0].getPosition()).toEqual({ x: 120, y: 240 });
    expect(rects[1].getPosition()).toEqual({ x: 120, y: 270 });
    expect(rects[2].getPosition()).toEqual({ x: 150, y: 240 });
    expect(rects[3].getPosition()).toEqual({ x: 150, y: 270 });
  });

  fit('should return avatar on top of the bottom shape', () => {
    let pos = { x: 30, y: 270 };
    const box = new Line(null, pos, 'red', velocity, cellSize, cellSize);

    expect(heap.add(box)).toBeTruthy();

    pos.y = 150;
    const line = new Line(null, pos, 'blue', velocity, cellSize, cellSize);
    line.rotate();
    line.update(false);

    const rects = heap.getAvatar(line);

    expect(rects[0].getPosition()).toEqual({ x: 30, y: 150 });
    expect(rects[1].getPosition()).toEqual({ x: 30, y: 180 });
    expect(rects[2].getPosition()).toEqual({ x: 30, y: 210 });
    expect(rects[3].getPosition()).toEqual({ x: 30, y: 240 });
  });
});
