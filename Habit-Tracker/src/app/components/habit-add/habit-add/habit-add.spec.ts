import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitAdd } from './habit-add';

describe('HabitAdd', () => {
  let component: HabitAdd;
  let fixture: ComponentFixture<HabitAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
