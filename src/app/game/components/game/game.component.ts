import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Game } from '../../core/Game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  public game!: Game;

  // private ctx: CanvasRenderingContext2D | null = null;
  private fieldWidth = 300;
  private fieldHeight = 600;
  private cellSize = 30;

  constructor(
    private gameService: GameService,
    @Inject(DOCUMENT) private readonly documentRef: Document
  ) {}

  ngOnInit(): void {
    this.canvas.nativeElement.width = this.fieldWidth;
    this.canvas.nativeElement.height = this.fieldHeight;

    //this.ctx = this.canvas.nativeElement.getContext('2d');
    this.game = this.gameService.create(this.canvas, this.cellSize);
  }

  public newGame() {
    if (this.game) {
      this.game.finish();
    }
    this.game = new Game(this.canvas.nativeElement, this.cellSize);
    this.game.start();
    this.canvas.nativeElement.focus();
  }

  public pauseGame() {
    this.game.pause();
  }

  public resumeGame() {
    this.game.resume();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyDown($event: KeyboardEvent) {
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
      case 'ArrowUp':
        this.game.rotateCurrent();
    }
  }

  @HostListener('window:keyup', ['$event'])
  public handleKeyUp($event: KeyboardEvent) {
    switch ($event.code) {
      case 'ArrowDown':
        this.game.moveDownStop();
        break;
      case 'Space':
        this.game.moveHardDown();
        break;
    }
  }
}
