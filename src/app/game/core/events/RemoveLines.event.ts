import { GameEvent, GameEventType } from '../common/types';

export class RemoveLinesEvent implements GameEvent<number> {
  readonly type = GameEventType.removeLines;

  constructor(private count: number) {}

  getPayload(): number {
    return this.count;
  }
}
