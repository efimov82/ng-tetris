import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Heap } from './Heap';
import { Box, Line, LShape, S1Shape, S2Shape, Shape, TShape } from './shapes';

export enum GameState {
  empty = 'empty',
  created = 'created',
  started = 'started',
  paused = 'paused',
  finished = 'finished',
}

export interface GameStatistic {
  time: number;
  removedLines: number;
  level: number;
  scores: number;
  next: Shape | undefined;
}

export class Game {
  private ctx: CanvasRenderingContext2D | null = null;
  private level: number = 1;
  private gameTime = 0;
  private removedLines = 0;
  private scores = 0;
  private state: GameState = GameState.empty;
  private timer = 0;
  private current: Shape | undefined;
  private next: Shape | undefined = undefined;
  private heap: Heap | undefined;
  private _freesed = false;

  private level$ = new BehaviorSubject(this.level);
  private gameTime$ = new BehaviorSubject(this.gameTime);
  private removedLines$ = new BehaviorSubject(this.removedLines);
  private scores$ = new BehaviorSubject<number>(this.scores);
  private state$ = new BehaviorSubject(this.state);
  private next$ = new BehaviorSubject<string | undefined>(this.next?.getName());

  private shapes: Map<number, string> = new Map([
    [0, 'Line'],
    [1, 'Box'],
    [2, 'LShape'],
    [3, 'TShape'],
    [4, 'S1Shape'],
    [5, 'S2Shape'],
  ]);
  private colors: Map<number, string> = new Map([
    [0, 'red'],
    [1, 'green'],
    [2, 'blue'],
    [3, 'purple'],
    [4, 'yellow'],
    [5, 'orange'],
    [6, 'pink'],
    [7, 'magenta'],
    [8, 'cyan'],
  ]);
  private animationFrame = 0;
  private lastUpdate: number = 0;
  private downVelocity = 1;

  constructor(private canvas: HTMLCanvasElement, private cellSize: number) {
    if (!canvas) {
      throw new Error('Canvas is not available');
    }
  }

  public update() {
    if (!this.ctx || !this.current || !this.heap) return;
    // if (this._freesed) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.heap.draw(this.current);
    if (this.state !== GameState.started) {
      this.current.draw();
      return;
    }

    if (this.detectCollisions(this.current)) {
      this.heap.add(this.current);
      const removedLines = this.heap.removeCompletedLines();
      this.removedLines += removedLines;

      if (this.heap.isTouchTop()) {
        this.setState(GameState.finished);
        this.current.draw();
        clearInterval(this.timer);
        return;
      }

      this.current = this.next;
      this.next = this.generateNext();
      // TODO refactor this
      this.scores += this.level + Math.pow(10, removedLines);
      this.level = Math.floor(this.removedLines / 20);
    } else {
      this.current.update(this.needMoveDown());
    }
  }

  protected needMoveDown(): boolean {
    const updateInterval = 1000 / this.downVelocity;
    if (Date.now() - this.lastUpdate > updateInterval) {
      this.lastUpdate = Date.now();
      return true;
    }

    return false;
  }

  public moveLeft() {
    if (this.state === GameState.started && this.current && !this._freesed) {
      if (this.heap?.isAllowedMoveLeft(this.current)) {
        this.current.moveLeft();
      }
    }
  }

  public moveRight() {
    if (this.state === GameState.started && this.current && !this._freesed) {
      if (this.heap?.isAllowedMoveRight(this.current)) {
        this.current.moveRight();
      }
    }
  }
  public moveDownStart() {
    if (this.state === GameState.started && this.current) {
      this.downVelocity = 2;
    }
  }
  public moveDownStop() {
    if (this.state === GameState.started && this.current) {
      this.downVelocity = 1;
    }
  }

  public rotateCurrent() {
    if (this.state === GameState.started && this.current) {
      this.current.rotate();
    }
  }

  public moveHardDown() {
    if (this.state === GameState.started && this.current && this.heap) {
      const futureRects = this.heap.getFutureRects(this.current);
      const firstRect = futureRects[0];
      const pos = this.current.getPosition();
      pos.y = firstRect.getPosition().y;
      console.log(firstRect, pos);
    }
  }

  public start() {
    this.init();
    this.setState(GameState.started);
    this.createTimer();
    this.lastUpdate = Date.now();
    this.animate();
  }

  private createTimer() {
    this.timer = window.setInterval(() => {
      this.gameTime += 1000;

      this.level$.next(this.level);
      this.gameTime$.next(this.gameTime);
      this.removedLines$.next(this.removedLines);
      this.scores$.next(this.scores);
      this.state$.next(this.state);
      this.next$.next(this.next?.getName());
    }, 1000);
  }

  public animate = () => {
    this.animationFrame = requestAnimationFrame(this.animate);
    if (this.state === GameState.finished) {
      cancelAnimationFrame(this.animationFrame);
      return;
    } else if (this.state === GameState.paused) {
      return;
    } else {
      this.update();
    }
  };

  public finish() {
    cancelAnimationFrame(this.animationFrame);
  }

  public pause() {
    this.setState(GameState.paused);
    clearInterval(this.timer);
  }

  public resume() {
    this.setState(GameState.started);
    this.createTimer();
  }

  public getState(): Observable<GameState> {
    return this.state$.asObservable();
  }

  public getLevel(): Observable<number> {
    return this.level$.asObservable();
  }

  public getGameTime(): Observable<number> {
    return this.gameTime$.asObservable();
  }

  public getRemovedLines(): Observable<number> {
    return this.removedLines$.asObservable();
  }

  public getScores(): Observable<number> {
    return this.scores$.asObservable();
  }

  public getNext(): Observable<string | undefined> {
    return this.next$.asObservable();
  }

  protected setState(state: GameState) {
    this.state = state;
    this.state$.next(state);
  }

  protected init() {
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      const rows = this.canvas.height / this.cellSize;
      const cols = this.canvas.width / this.cellSize;

      this.heap = new Heap(rows, cols, this.cellSize);
      this.current = this.generateNext();
      this.next = this.generateNext();
    }
    this.state = GameState.created;
    this.scores = 0;
    this.removedLines = 0;
    this.gameTime = 0;
  }

  protected detectCollisions(obj: Shape): boolean {
    this._freesed = true;
    let res = false;

    const rectangles = obj.getRectangles();
    rectangles.forEach((rectangle) => {
      if (this.heap && this.heap.detectCollisions(rectangle)) {
        res = true;
        return;
      }
    });

    this._freesed = false;
    return res;
  }

  protected generateNext(): Shape | undefined {
    if (this.ctx) {
      const colorIndex = this.getRandomInt(this.colors.size);
      const shapeIndex = this.getRandomInt(this.shapes.size);
      const color = this.colors.get(colorIndex) || 'red';

      return this.createShape(shapeIndex, color);
    } else {
      console.log("can't generateNext");
      return undefined;
    }
  }

  protected createShape(shapeIndex: number, color: string): Shape | undefined {
    if (!this.ctx) return undefined;

    const position = { x: 120, y: -30 };
    const velocity = { x: 0, y: 1 };

    switch (shapeIndex) {
      case 0:
        //position.y = 0;
        return new Line(
          this.ctx,
          position,
          color,
          velocity,
          this.cellSize,
          this.cellSize
        );
      case 1:
        return new Box(
          this.ctx,
          position,
          color,
          velocity,
          this.cellSize,
          this.cellSize
        );
      case 2:
        return new LShape(
          this.ctx,
          position,
          color,
          velocity,
          this.cellSize,
          this.cellSize
        );
      case 3:
        return new TShape(
          this.ctx,
          position,
          color,
          velocity,
          this.cellSize,
          this.cellSize
        );
      case 4:
        return new S1Shape(
          this.ctx,
          position,
          color,
          velocity,
          this.cellSize,
          this.cellSize
        );
      case 5:
        return new S2Shape(
          this.ctx,
          position,
          color,
          velocity,
          this.cellSize,
          this.cellSize
        );
      default:
        console.log("can't createShape by index=", shapeIndex);
        return undefined;
    }
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
