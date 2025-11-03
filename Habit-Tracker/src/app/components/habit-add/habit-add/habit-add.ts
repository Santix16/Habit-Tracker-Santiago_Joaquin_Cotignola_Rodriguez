import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habit } from '../../../interfaces/Habit';
import { HabitService } from '../../../services/habit.service';

@Component({
  selector: 'habit-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habit-add.html',
  styleUrls: ['./habit-add.css']
})
export class HabitAddComponent {
  newHabit: Habit = this.getEmptyHabit();

  @Output() onAdd = new EventEmitter<Habit>();

  constructor(private habitService: HabitService) {}

  addHabit() {
    // Llamamos al servicio para guardar el nuevo hábito
    this.habitService.addHabit(this.newHabit).subscribe({
      next: (habitFromServer) => {
        this.onAdd.emit(habitFromServer); // Emitimos el hábito recibido (con id del servidor)
        this.newHabit = this.getEmptyHabit(); // Reseteamos el formulario
      },
      error: (err) => console.error('Error al añadir hábito:', err)
    });
  }

  private getEmptyHabit(): Habit {
    return {
      id: '',
      name: '',
      category: '',
      goalType: 'daily',
      status: 'In Progress',
      notes: '',
      progress: []
    };
  }
}


