import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Habit } from '../../../interfaces/Habit';
import { HabitService } from '../../../services/habit.service';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';


export const MY_DATE_FORMATS = {
  parse: { dateInput: 'dd/MM/yyyy' },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'habit-detail',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatProgressBarModule, MatDatepickerModule, RouterModule, DatePipe, MatNativeDateModule
  ],
  templateUrl: './habit-detail.html',
  styleUrls: ['./habit-detail.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class HabitDetail implements OnInit {
  @Input() habit!: Habit;
  @Output() onClose = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<Habit>();
  @Output() onEdit = new EventEmitter<Habit>();

  newProgress = { date: new Date(), status: 'Completed' };
  dateError: string = '';

  constructor(
    private route: ActivatedRoute,
    private habitService: HabitService,
    private adapter: DateAdapter<any>
  ) {
    this.adapter.setLocale('es-ES'); // fuerza español
  }

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

  validateDate(date: Date): boolean {
    if (!date) return false;
    const selected = new Date(date);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selected <= today;
  }

  addProgress() {
    if (!this.newProgress.date || !this.newProgress.status) return;

    if (!this.validateDate(this.newProgress.date)) {
      this.dateError = 'La fecha no puede ser futura.';
      return;
    }

    const formattedDate = formatDate(this.newProgress.date, 'dd/MM/yyyy', 'es-ES');

    this.habit.progress.push({
      date: formattedDate,
      status: this.newProgress.status as 'In Progress' | 'Completed' | 'Paused'
    });

    this.sortProgress();
    this.newProgress = { date: new Date(), status: 'In Progress' };
    this.dateError = '';
  }

  sortProgress() {
    this.habit.progress.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
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




