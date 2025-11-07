import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Habit } from '../../../interfaces/Habit';

@Component({
  selector: 'habit-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './habit-detail.html',
  styleUrls: ['./habit-detail.css']
})
export class HabitDetailComponent {
  @Input() habit!: Habit;
  @Output() onClose = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<Habit>();
  @Output() onEdit = new EventEmitter<Habit>();

  newProgress = { date: '', status: '' };

  addProgress() {
    if (this.newProgress.date && this.newProgress.status) {
      this.habit.progress.push({
        date: this.newProgress.date,
        status: this.newProgress.status as 'Completed' | 'Missed' | 'Skipped'
      });
      this.newProgress = { date: '', status: 'Completed' };
    }
  }

  deleteProgress(index: number) {
    this.habit.progress.splice(index, 1);
  }

  deleteHabit() {
    this.onDelete.emit(this.habit);
  }

  editHabit() {
    this.onEdit.emit(this.habit);
  }

  close() {
    this.onClose.emit();
  }
}

