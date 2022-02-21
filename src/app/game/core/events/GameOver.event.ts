import { GameEvent, GameEventType } from '../common/types';

export class GameOverEvent implements GameEvent<null> {
  readonly type = GameEventType.gameOver;

  getPayload(): null {
    return null;
  }
}
