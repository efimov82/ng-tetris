import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatisticComponent } from './game-statistic.component';

describe('GameStatisticComponent', () => {
  let component: GameStatisticComponent;
  let fixture: ComponentFixture<GameStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
