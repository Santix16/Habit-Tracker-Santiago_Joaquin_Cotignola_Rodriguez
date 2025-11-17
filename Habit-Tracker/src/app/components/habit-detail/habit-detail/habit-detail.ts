import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
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

  newProgress = { date: '', status: '' };

  constructor(
    private route: ActivatedRoute,
    private habitService: HabitService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.habit && id) {
      this.habitService.getHabitById(String(id)).subscribe(h => (this.habit = h));
    }
  }

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
  if (!confirm("¿Estás seguro de querer eliminar este hábito?") || !this.habit.id) return;

  this.habitService.deleteHabit(this.habit.id).subscribe({
    next: () => {
      this.onDelete.emit(this.habit); // avisa al componente padre
      this.close(); // cierra la pestaña de detalles
    },
    error: (err) => console.error('Error al borrar hábito:', err)
  });
}

  editHabit() {
    this.onEdit.emit(this.habit);
  }

  close() {
    this.onClose.emit();
  }
}

