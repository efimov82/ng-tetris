import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../classes/Game';
import { Shape } from '../classes/shapes';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private game?: Game;

  constructor() {}

  create(canvas: ElementRef<HTMLCanvasElement>, cellSize: number): Game {
    this.game = new Game(canvas.nativeElement, cellSize);
    return this.game;
  }

  public getNextShape(): Observable<Shape | undefined> | undefined {
    return this.game?.getNext();
  }
}