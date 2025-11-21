import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { Habit } from '../../../interfaces/Habit';
import { HabitService } from '../../../services/habit.service';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';

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
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    DatePipe
  ],
  templateUrl: './habit-detail.html',
  styleUrls: ['./habit-detail.css']
})
export class HabitDetail implements OnInit {
  @Input() habit!: Habit;
  @Output() onClose = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<Habit>();
  @Output() onEdit = new EventEmitter<Habit>();

  newProgress = { date: '', status: 'Completed' };
  dateError: string = '';

  constructor(private route: ActivatedRoute, private habitService: HabitService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.habit && id) {
      this.habitService.getHabitById(String(id)).subscribe(h => {
        this.habit = h;
        this.sortProgress();
      });
    } else if (this.habit) {
      this.sortProgress();
    }
  }

  // ✅ Validar solo que la fecha no sea futura
  validateDate(date: string): boolean {
    if (!date) return false;

    const selected = new Date(date);
    const today = new Date();

    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selected <= today; //
  }

  addProgress() {
    if (!this.newProgress.date || !this.newProgress.status) return;

    if (!this.validateDate(this.newProgress.date)) {
      this.dateError = 'La fecha no puede ser futura.';
      return;
    }

    this.habit.progress.push({
      date: this.newProgress.date,
      status: this.newProgress.status as 'In Progress' | 'Completed' | 'Paused'
    });

    this.sortProgress();
    this.newProgress = { date: '', status: 'In Progress' };
    this.dateError = '';
  }

  sortProgress() {
    this.habit.progress.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  deleteProgress(index: number) {
    this.habit.progress.splice(index, 1);
  }

  deleteHabit() {
    if (!confirm('¿Estás seguro de querer eliminar este hábito?') || !this.habit.id) return;
    this.habitService.deleteHabit(this.habit.id).subscribe({
      next: () => {
        this.onDelete.emit(this.habit);
        this.close();
      },
      error: err => console.error('Error al borrar hábito:', err)
    });
  }

  editHabit() {
    this.onEdit.emit(this.habit);
  }

  close() {
    this.onClose.emit();
  }
}



