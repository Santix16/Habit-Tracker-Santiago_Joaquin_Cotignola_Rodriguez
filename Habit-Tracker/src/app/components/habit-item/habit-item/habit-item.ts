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
import { RouterModule } from '@angular/router';


@Component({
  selector: 'habit-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatProgressBarModule, MatDividerModule, RouterModule],
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

  newProgress = { date: '', status: 'Completed' };

addProgress() {
  if (!this.newProgress.date || !this.newProgress.status) {
    return;
  }
  this.habit.progress.push({
    date: this.newProgress.date,
    status: this.newProgress.status as 'Completed' | 'Missed' | 'Skipped'
  });
  this.newProgress = { date: '', status: 'Completed' };
}

deleteProgress(index: number) {
  this.habit.progress.splice(index, 1);
}

deleteHabit() {
  if (!this.habit.id || !confirm("¿Estás seguro de querer eliminar este hábito?")) return;

  this.habitService.deleteHabit(this.habit.id).subscribe({
    next: () => this.onDelete.emit(this.habit),
    error: (err) => console.error('Error al borrar hábito:', err)
  });
}
}



