import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitItemComponent } from './habit-item';
import { CommonModule } from '@angular/common';

describe('HabitItemComponent', () => {
  let component: HabitItemComponent;
  let fixture: ComponentFixture<HabitItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitItemComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
