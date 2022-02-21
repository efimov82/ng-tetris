import { GameEvent, GameEventType } from '../common/types';

export class AddScoresEvent implements GameEvent<number> {
  readonly type = GameEventType.addScores;

  constructor(private count: number) {}

  getPayload(): number {
    return this.count;
  }
}
