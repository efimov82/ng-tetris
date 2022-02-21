import { GameEvent, GameEventType } from '../common/types';

export class LevelUpEvent implements GameEvent<number> {
  readonly type = GameEventType.levelUp;

  constructor(private level: number) {}

  getPayload(): number {
    return this.level;
  }
}
