import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { textChangeRangeIsUnchanged } from 'typescript';
import { Game } from '../../classes/Game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  public game!: Game;

  private ctx: CanvasRenderingContext2D | null = null;
  private fieldWidth = 360;
  private fieldHeight = 600;
  private cellSize = 30;

  constructor() {}

  ngOnInit(): void {
    this.canvas.nativeElement.width = this.fieldWidth;
    this.canvas.nativeElement.height = this.fieldHeight;

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.game = new Game(this.canvas.nativeElement, this.cellSize);
  }

  public newGame() {
    this.game = new Game(this.canvas.nativeElement, this.cellSize);
    this.game.start();
  }

  public pauseGame() {
    this.game.pause();
  }

  public resumeGame() {
    this.game.resume();
  }

  public handleKeyUp($event: KeyboardEvent) {
    switch ($event.code) {
      case 'ArrowLeft':
        this.game.moveLeft();
        break;
      case 'ArrowRight':
        this.game.moveRight();
        break;
      case 'ArrowDown':
        this.game.moveDownStart();
        break;
    }
  }
}
