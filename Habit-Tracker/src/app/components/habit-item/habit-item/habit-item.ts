import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Habit } from '../../../interfaces/Habit';
import { HabitService } from '../../../services/habit.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'habit-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatProgressBarModule, MatDividerModule],
  templateUrl: './habit-item.html',
  styleUrls: ['./habit-item.css']
})
export class HabitItemComponent {
  @Input() habit!: Habit;
  @Output() onDelete = new EventEmitter<Habit>();
  @Output() onViewDetails = new EventEmitter<Habit>();


  constructor(private habitService: HabitService) {}

  viewDetails() {
    this.onViewDetails.emit(this.habit);
  }
}



