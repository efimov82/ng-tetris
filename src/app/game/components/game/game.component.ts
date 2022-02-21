import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SOUND } from '../../core/common/constants';
import { GameEvent, GameEventType } from '../../core/common/types';
import { GameOverEvent } from '../../core/events';
import { Game } from '../../core/Game';
import { GameService } from '../../services/game.service';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  public game!: Game;

  private fieldWidth = 300;
  private fieldHeight = 600;
  private cellSize = 30;
  private eventSub: Subscription = new Subscription();

  constructor(
    private gameService: GameService,
    private soundService: SoundService,
    @Inject(DOCUMENT) private readonly documentRef: Document
  ) {}

  ngOnInit(): void {
    this.canvas.nativeElement.width = this.fieldWidth;
    this.canvas.nativeElement.height = this.fieldHeight;

    this.game = this.gameService.create(this.canvas, this.cellSize);
  }

  public newGame() {
    if (this.game) {
      this.game.finish();
    }
    this.game = this.gameService.create(this.canvas, this.cellSize);
    this.eventSub = this.game
      .getEvents()
      .subscribe(this.eventHandler.bind(this));
    this.game.start();
    this.soundService.play(SOUND.gameStarted);
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
        this.game.hardDrop();
        break;
    }
  }

  protected eventHandler(event: GameEvent<any>): void {
    switch (event.type) {
      case GameEventType.addShape:
        this.soundService.play(SOUND.addShape);
        break;
      case GameEventType.removeLines:
        this.soundService.play(SOUND.removeLine);
        break;
      case GameEventType.levelUp:
        this.soundService.play(SOUND.levelUp);
        break;
      case GameEventType.gameOver:
        this.soundService.play(SOUND.gameOver);
        break;
    }
  }

  ngOnDestroy(): void {
    this.game.finish();
    this.eventSub.unsubscribe();
  }
}
