import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Habit } from '../../../interfaces/Habit';
import { HabitService } from '../../../services/habit.service';

@Component({
  selector: 'habit-item',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './habit-item.html',
  styleUrls: ['./habit-item.css']
})
export class HabitItemComponent {
  @Input() habit!: Habit;
  @Output() onDelete = new EventEmitter<Habit>();

  constructor(private habitService: HabitService) {}

  deleteHabit() {
    if (!confirm('¿Estás seguro de querer eliminar este hábito?') || !this.habit.id) return;

    this.habitService.deleteHabit(this.habit.id).subscribe({
      next: () => this.onDelete.emit(this.habit),
      error: (err) => console.error('Error al eliminar el hábito:', err)
    });
  }
}

