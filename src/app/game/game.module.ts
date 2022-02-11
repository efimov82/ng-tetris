import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { GameRoutingModule } from './game-routing.module';
import { GamePanelComponent } from './components/game-panel/game-panel.component';

@NgModule({
  declarations: [GameComponent, GamePanelComponent],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
