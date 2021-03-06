import { Component, Input } from '@angular/core';
import { Game } from '../../core/Game';

@Component({
  selector: 'game-statistic',
  templateUrl: './game-statistic.component.html',
  styleUrls: ['./game-statistic.component.scss'],
})
export class GameStatisticComponent {
  @Input() game!: Game;
}
