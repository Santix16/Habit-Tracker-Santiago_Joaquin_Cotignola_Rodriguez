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
    RouterModule
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

  dateError: string = '';

addProgress() {
  if (!this.newProgress.date || !this.newProgress.status) return;

  if (!this.isValidDate(this.newProgress.date)) {
    this.dateError = 'Fecha inválida.';
    return;
  }

  this.habit.progress.push({
    date: this.newProgress.date,
    status: this.newProgress.status as 'In Progress' | 'Completed' | 'Paused'
  });

  this.sortProgress();
  this.newProgress = { date: '', status: 'In Progress' };
  this.dateError = '';

  this.newProgress = { date: '', status: 'Completado' };
  this.dateError = '';
}

isValidDate(dateString: string): boolean {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateString.match(regex);
  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (month < 1 || month > 12) return false;

  const daysInMonth = [
    31,
    (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28,
    31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];

  return day >= 1 && day <= daysInMonth[month - 1];
}

  sortProgress() {
  this.habit.progress.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateB.getTime() - dateA.getTime(); // descendente
  });
}


  deleteProgress(index: number) { this.habit.progress.splice(index, 1); }

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

  editHabit() { this.onEdit.emit(this.habit); }

  close() { this.onClose.emit(); }
}


