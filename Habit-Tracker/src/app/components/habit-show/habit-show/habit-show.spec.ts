import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitsShow } from './habit-show';

describe('HabitsShow', () => {
  let component: HabitsShow;
  let fixture: ComponentFixture<HabitsShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitsShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
