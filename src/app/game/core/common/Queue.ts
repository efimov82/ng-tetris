interface IQueue<T> {
  push(item: T): void;
  pop(): T | undefined;
  getItems(): T[];
}

/**
 * FIFO (first in first out)
 */
export class Queue<T> implements IQueue<T> {
  private items: T[] = [];

  constructor(private size: number = Infinity) {}

  push(item: T): void {
    if (this.items.length === this.size) {
      this.pop();
    }

    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.shift();
  }

  getItems(): T[] {
    return this.items;
  }
}
