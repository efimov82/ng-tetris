import { Injectable } from '@angular/core';
import { SOUND } from '../core/common/constants';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private soundMuted = false;
  private audio: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    if (typeof Audio !== 'undefined') {
      (Object.keys(SOUND) as Array<keyof typeof SOUND>).map((key) => {
        this.audio.set(
          SOUND[key],
          new Audio(`../../assets/sounds/${SOUND[key]}`)
        );
      });
    }
  }

  public setSoundMuted(value: boolean): void {
    this.soundMuted = value;
  }

  public getSoundMuted(): boolean {
    return this.soundMuted;
  }

  public play(sound: SOUND): void {
    if (this.soundMuted || !this.audio) return;

    const audio = this.audio.get(sound);
    if (audio) {
      audio.load();
      audio.play();
    }
  }
}
