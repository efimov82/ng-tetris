import { Heap } from './Heap';
import { Line } from './shapes';

describe('Heap', () => {
  const velocity = { x: 0, y: 0 };
  let heap: Heap;

  beforeEach(() => {
    heap = new Heap(10, 12);
  });

  it('should remove complited line', () => {
    let pos = { x: 0, y: 270 };
    const line1 = new Line(null, pos, 'red', velocity, 30, 30);

    pos = { x: 120, y: 270 };
    const line2 = new Line(null, pos, 'red', velocity, 30, 30);

    pos = { x: 240, y: 270 };
    const line3 = new Line(null, pos, 'red', velocity, 30, 30);

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
});
