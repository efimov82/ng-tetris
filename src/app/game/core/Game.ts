import { BehaviorSubject, Observable } from 'rxjs';
import { Queue } from './common/Queue';
import { Shape } from './common/Shape.abstract';
import { ShapeFactory } from './common/ShapeFactory';
import { calculateScores, getLevelSpeed } from './common/utils';
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
  private ctx: CanvasRenderingContext2D;
  private level: number = 1;
  private gameTime = 0;
  private removedLines = 0;
  private scores = 0;
  private state: GameState = GameState.empty;
  private timer = 0;
  private current: Shape | undefined;
  private next: Shape | undefined = undefined;
  private heap: Heap | undefined;
  private queue: Queue<Shape> = new Queue(3);

  private level$ = new BehaviorSubject(this.level);
  private gameTime$ = new BehaviorSubject(this.gameTime);
  private removedLines$ = new BehaviorSubject(this.removedLines);
  private scores$ = new BehaviorSubject<number>(this.scores);
  private state$ = new BehaviorSubject(this.state);
  private nextItems$ = new BehaviorSubject<Shape[]>(this.queue.getItems());

  private animationFrame = 0;
  private lastUpdate: number = 0;
  private downVelocity = 1;
  private notice = `Let's go!`;
  private noticeOpacity = 1;

  constructor(private canvas: HTMLCanvasElement, private cellSize: number) {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    this.ctx = ctx;
    this.init();
  }

  public start() {
    this.init();
    this.setState(GameState.started);
    this.createTimer();
    this.lastUpdate = Date.now();
    this.animate();
  }

  public animate() {
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    if (this.state === GameState.finished) {
      cancelAnimationFrame(this.animationFrame);
      return;
    } else if (this.state === GameState.paused) {
      return;
    } else {
      this.update();
    }
  }

  public hardDrop() {
    if (this.state === GameState.started && this.current && this.heap) {
      const futureRects = this.heap.getAvatar(this.current);
      const firstRect = futureRects[0];
      const pos = this.current.getPosition();
      pos.y = firstRect.getPosition().y;

      this.current.setPosition(pos);
      this.current.update(false);

      this.addCurrentShapeToHeap();
    }
  }

  public update() {
    if (!this.current || !this.heap) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.heap.draw(this.current);
    if (this.state !== GameState.started) {
      this.current.draw();
      return;
    }

    if (this.detectCollisions(this.current)) {
      this.addCurrentShapeToHeap();
    } else {
      this.current.update(this.needMoveDown());
    }

    this.showNotice();
  }

  protected showNotice(): void {
    if (this.notice) {
      this.ctx.font = '48px serif';
      this.ctx.fillStyle = 'grey';
      this.ctx.globalAlpha = this.noticeOpacity;
      this.ctx.fillText(
        this.notice,
        this.canvas.width / 4,
        this.canvas.height / 3
      );

      this.ctx.globalAlpha = 1;
      this.noticeOpacity -= 0.003;

      if (this.noticeOpacity <= 0) {
        this.notice = '';
      }
    }
  }

  protected addCurrentShapeToHeap() {
    if (!this.current || !this.heap) return;

    const res = this.heap.add(this.current);
    const removedLines = this.heap.removeCompletedLines();
    this.removedLines += removedLines;

    if (this.heap.isTouchTop()) {
      this.gameOver();
      return;
    }

    this.current = this.queue.pop();

    this.queue.push(this.generateNext());
    this.nextItems$.next([...this.queue.getItems()].reverse());

    this.scores += calculateScores(removedLines);
    this.calculateLevel();
  }

  protected calculateLevel(): void {
    const level = Math.floor(this.removedLines / 20) + 1;
    if (this.level !== level) {
      this.level = level;
      this.notice = 'Level ' + level;
      this.noticeOpacity = 1;
    }
  }

  public moveLeft() {
    if (this.state === GameState.started && this.current) {
      if (this.heap?.isAllowedMoveLeft(this.current)) {
        this.current.moveLeft();
      }
    }
  }

  public moveRight() {
    if (this.state === GameState.started && this.current) {
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

  public getNextItems(): Observable<Shape[]> {
    return this.nextItems$.asObservable();
  }

  protected setState(state: GameState) {
    this.state = state;
    this.state$.next(state);
  }

  protected init() {
    const rows = this.canvas.height / this.cellSize;
    const cols = this.canvas.width / this.cellSize;

    this.heap = new Heap(rows, cols, this.cellSize);
    this.current = this.generateNext();
    this.next = this.generateNext();

    this.queue.push(this.next);
    this.queue.push(this.generateNext());
    this.queue.push(this.generateNext());

    this.state = GameState.created;
    this.scores = 0;
    this.removedLines = 0;
    this.gameTime = 0;
  }

  protected detectCollisions(obj: Shape): boolean {
    let res = false;

    const rectangles = obj.getRectangles();
    rectangles.forEach((rectangle) => {
      if (this.heap && this.heap.detectCollisions(rectangle)) {
        res = true;
        return;
      }
    });

    return res;
  }

  protected needMoveDown(): boolean {
    const updateInterval = getLevelSpeed(this.level) / this.downVelocity;
    const timestamp = Date.now();
    if (timestamp - this.lastUpdate > updateInterval) {
      this.lastUpdate = timestamp;
      return true;
    }

    return false;
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

  protected generateNext(): Shape {
    return ShapeFactory.createRandome(this.ctx, this.cellSize);
  }
}
