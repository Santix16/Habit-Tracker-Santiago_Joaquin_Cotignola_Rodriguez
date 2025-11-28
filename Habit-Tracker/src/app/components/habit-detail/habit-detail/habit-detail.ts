import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

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
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDatepickerModule,
    RouterModule,
    MatNativeDateModule
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

  newProgress: { date: Date | null; status: 'In Progress' | 'Completed' | 'Paused' } = { date: new Date(), status: 'Completed' };
  dateError: string = '';

  constructor(
    private route: ActivatedRoute,
    private habitService: HabitService,
    private adapter: DateAdapter<any>,
    private snackBar: MatSnackBar
  ) {
    this.adapter.setLocale('es-ES');
  }

  ngOnInit() {
    if (!this.habit) this.habit = {} as Habit;
    if (!this.habit.progress) this.habit.progress = [];

    this.habit.progress.sort((a: any, b: any) => {
    const parseDate = (d: string) => {
      const [day, month, year] = d.split('/');
      return new Date(+year, +month - 1, +day).getTime();
    };
    return parseDate(b.date) - parseDate(a.date);
  });
  }

  validateDate(date: Date | null): boolean {
    if (!date) return false;
    const selected = new Date(date);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selected <= today;
  }

  addProgress(form?: NgForm) {
  this.dateError = '';

  const dateVal: Date | null = form?.value?.date ?? this.newProgress.date;
  const statusVal: 'In Progress' | 'Completed' | 'Paused' = form?.value?.status ?? this.newProgress.status;

  if (!dateVal || !statusVal) {
    this.snackBar.open('Fecha y estado son obligatorios.', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
    return;
  }

  if (!this.validateDate(dateVal)) {
    this.snackBar.open('La fecha no puede ser futura.', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
    return;
  }

  const formattedDate = formatDate(dateVal, 'dd/MM/yyyy', 'es-ES');

  if (!this.habit.progress) this.habit.progress = [];

  const exists = this.habit.progress.some(p => p.date === formattedDate);
  if (exists) {
    this.snackBar.open('Ya existe un progreso para esta fecha en este hábito.', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
    return;
  }

  this.habit.progress.push({
    date: formattedDate,
    status: statusVal
  } as any);

  this.habit.progress.sort((a: any, b: any) => {
    const parse = (x: any) => {
      if (!x) return 0;
      if (typeof x === 'string') return new Date(x.split('/').reverse().join('-')).getTime();
      return new Date(x).getTime();
    };
    return parse(b.date) - parse(a.date);
  });

  if (form) {
    form.resetForm({ date: new Date(), status: 'In Progress' });
    this.newProgress = { date: new Date(), status: 'In Progress' };
  } else {
    this.newProgress = { date: new Date(), status: 'In Progress' };
  }

  this.snackBar.open('Progreso añadido', '', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['custom-snackbar']
  });
}

  deleteProgress(index: number) {
    if (!confirm('¿Estás seguro de querer eliminar este progreso?') || !this.habit.id) return;
    this.habit.progress.splice(index, 1);

    this.snackBar.open('Progreso eliminado', '', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['custom-snackbar']
  });
  }

  deleteHabit() {
    if (!confirm('¿Estás seguro de querer eliminar este hábito?') || !this.habit.id) return;

    this.habitService.deleteHabit(this.habit.id).subscribe({
      next: () => {
        this.onDelete.emit(this.habit);
        this.close();
        this.snackBar.open('Hábito eliminado exitosamente', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
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





