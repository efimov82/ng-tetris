import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shape } from '../core/common/Shape.abstract';
import { Game } from '../core/Game';

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

  public getNextShapes(): Observable<Shape[] | undefined> | undefined {
    return this.game?.getNextItems();
  }
}
