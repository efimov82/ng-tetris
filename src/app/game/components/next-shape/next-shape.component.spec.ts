import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextShapeComponent } from './next-shape.component';

describe('NextShapeComponent', () => {
  let component: NextShapeComponent;
  let fixture: ComponentFixture<NextShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextShapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
