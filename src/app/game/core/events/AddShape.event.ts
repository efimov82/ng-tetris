import { GameEvent, GameEventType } from '../common/types';

export class AddShapeEvent implements GameEvent<null> {
  readonly type = GameEventType.addShape;

  getPayload(): null {
    return null;
  }
}
