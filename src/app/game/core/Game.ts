import { BehaviorSubject, Observable } from 'rxjs';
import { Shape } from './common/Shape.abstract';
import { ShapeFactory } from './common/ShapeFactory';
import { Heap } from './Heap';

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
  private next$ = new BehaviorSubject<Shape | undefined>(this.next);

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
        this.gameOver();
        return;
      }

      this.current = this.next;
      this.next = this.generateNext();

      this.calculateScores(removedLines);
      this.level = Math.floor(this.removedLines / 20) + 1;
    } else {
      this.current.update(this.needMoveDown());
    }
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
      const futureRects = this.heap.getAvatar(this.current);
      const firstRect = futureRects[0];
      const pos = this.current.getPosition();
      pos.y = firstRect.getPosition().y;
      // console.log(firstRect, pos);
    }
  }

  public start() {
    this.init();
    this.setState(GameState.started);
    this.createTimer();
    this.lastUpdate = Date.now();
    this.animate();
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

  public getNext(): Observable<Shape | undefined> {
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

  protected needMoveDown(): boolean {
    const levelSpeed = this.getLevelSpeed();
    const updateInterval = (1000 - levelSpeed) / this.downVelocity;
    if (Date.now() - this.lastUpdate > updateInterval) {
      this.lastUpdate = Date.now();
      return true;
    }

    return false;
  }

  protected getLevelSpeed(): number {
    switch (this.level) {
      case 1:
        return 0;
      case 2:
        return 300;
      case 3:
        return 500;
      case 4:
        return 600;
      case 5:
        return 700;
      default:
        return 800;
    }
  }

  protected createTimer() {
    this.timer = window.setInterval(() => {
      this.gameTime += 1000;

      this.level$.next(this.level);
      this.gameTime$.next(this.gameTime);
      this.removedLines$.next(this.removedLines);
      this.scores$.next(this.scores);
      this.state$.next(this.state);
    }, 1000);
  }

  protected gameOver() {
    this.setState(GameState.finished);
    this.current?.draw();
    clearInterval(this.timer);
  }

  protected calculateScores(removedLines: number): void {
    let val = 0;
    switch (removedLines) {
      case 1:
        val = 100;
        break;
      case 2:
        val = 300;
        break;
      case 3:
        val = 500;
        break;
      case 4:
        val = 900;
        break;
      default:
        val = 0;
    }

    this.scores += val;
  }

  protected generateNext(emitNext = true): Shape | undefined {
    if (this.ctx) {
      const nextShape = ShapeFactory.createRandome(this.ctx, this.cellSize);
      if (emitNext) {
        this.next$.next(nextShape);
      }
      return nextShape;
    } else {
      console.log("can't generateNext");
      return undefined;
    }
  }
}
