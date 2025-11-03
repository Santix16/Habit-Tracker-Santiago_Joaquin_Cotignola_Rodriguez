import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitShow } from './habit-show';

describe('HabitShow', () => {
  let component: HabitShow;
  let fixture: ComponentFixture<HabitShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
