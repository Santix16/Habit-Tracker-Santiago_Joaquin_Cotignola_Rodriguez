import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitItem } from './habit-item';

describe('HabitItem', () => {
  let component: HabitItem;
  let fixture: ComponentFixture<HabitItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
