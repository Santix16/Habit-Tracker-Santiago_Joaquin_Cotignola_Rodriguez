import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { catchError, of } from 'rxjs';

import { Habit } from '../../../interfaces/Habit';
import { HabitService } from '../../../services/habit.service';
import { HabitFilterPipe } from '../../../pipes/habit-filter-pipe';
import { HabitAddComponent } from '../../habit-add/habit-add/habit-add';
import { HabitItemComponent } from '../../habit-item/habit-item/habit-item';

@Component({
  selector: 'app-habits-show',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    HabitFilterPipe,
    HabitAddComponent,
    HabitItemComponent
  ],
  templateUrl: './habit-show.html',
  styleUrls: ['./habit-show.css']
})
export class HabitsShow implements OnInit {
  habits: Habit[] = [];
  search: string = '';
  newHabit: Habit = this.getEmptyHabit();

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.loadHabits();
  }

  /** 🔹 Cargar hábitos desde el servicio */
  loadHabits(): void {
    this.habitService.getHabits()
      .pipe(
        catchError(err => {
          console.error('Error cargando hábitos:', err);
          return of([]);
        })
      )
      .subscribe(data => this.habits = data);
  }

  /** 🔹 Crear un hábito vacío */
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

  /** 🔹 Añadir hábito (desde formulario o subcomponente) */
  addHabit(nuevoHabit?: Habit): void {
    const habit = nuevoHabit || this.newHabit;
    if (!habit.name || !habit.category) return;

    habit.id = undefined;

    this.habitService.addHabit(habit)
      .pipe(
        catchError(err => {
          console.error('Error al añadir hábito:', err);
          return of(null);
        })
      )
      .subscribe(habitFromServer => {
        if (habitFromServer) {
          this.habits = [...this.habits, habitFromServer];
          this.newHabit = this.getEmptyHabit();
        }
      });
  }

  /** 🔹 Eliminar hábito */
  deleteHabit(habitToDelete: Habit): void {
    if (!habitToDelete.id) return;

    this.habitService.deleteHabit(habitToDelete.id)
      .pipe(
        catchError(err => {
          console.error('Error al borrar hábito:', err);
          return of(null);
        })
      )
      .subscribe(() => {
        this.habits = this.habits.filter(h => h.id !== habitToDelete.id);
      });
  }

  /** 🔹 Ordenar por nombre */
  orderByName(): void {
    this.habits = [...this.habits].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  /** 🔹 Ordenar por progreso (según cantidad de registros) */
  orderByProgress(): void {
    this.habits = [...this.habits].sort(
      (a, b) => b.progress.length - a.progress.length
    );
  }

  /** 🔹 TrackBy seguro */
  trackById(index: number, habit: Habit): string | number {
    return habit.id ?? index;
  }
}

