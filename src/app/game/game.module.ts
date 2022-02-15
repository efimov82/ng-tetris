import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { GameRoutingModule } from './game-routing.module';
import { GamePanelComponent } from './components/game-panel/game-panel.component';
import { GameStatisticComponent } from './components/game-statistic/game-statistic.component';
import { NextShapeComponent } from './components/next-shape/next-shape.component';

@NgModule({
  declarations: [
    GameComponent,
    GamePanelComponent,
    GameStatisticComponent,
    NextShapeComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
