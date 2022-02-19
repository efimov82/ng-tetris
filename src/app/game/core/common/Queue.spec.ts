import { Queue } from './Queue';

fdescribe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>(3);
  });

  fit('should push items to queue', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    expect(queue.getItems()).toEqual([1, 2, 3]);
  });

  fit('should pop item', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    const item = queue.pop();
    const item2 = queue.pop();

    expect(item).toEqual(1);
    expect(item2).toEqual(2);
    expect(queue.getItems()).toEqual([3]);
  });

  fit('should pop item over size', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);
    queue.push(4);
    queue.push(5);

    expect(queue.getItems()).toEqual([3, 4, 5]);
  });
});
