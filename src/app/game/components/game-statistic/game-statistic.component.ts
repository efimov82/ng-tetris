import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Shape } from '../../classes/shapes';

@Component({
  selector: 'game-statistic',
  templateUrl: './game-statistic.component.html',
  styleUrls: ['./game-statistic.component.scss'],
})
export class GameStatisticComponent {
  @Input() gameTime$!: Observable<number>;
  @Input() removedLines$!: Observable<number>;
  @Input() scores$!: Observable<number>;
  @Input() next$!: Observable<Shape | undefined>;
}