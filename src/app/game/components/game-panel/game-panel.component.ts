import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { GameState } from '../../core/Game';

@Component({
  selector: 'game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss'],
})
export class GamePanelComponent {
  @Input() gameState$!: Observable<GameState>;

  @Output() newGame = new EventEmitter();
  @Output() pauseGame = new EventEmitter();
  @Output() resumeGame = new EventEmitter();

  public GameState = GameState;

  public onStartClick() {
    this.newGame.emit();
  }

  public onPauseClick() {
    this.pauseGame.emit();
  }

  public onResumeClick() {
    this.resumeGame.emit();
  }
}
