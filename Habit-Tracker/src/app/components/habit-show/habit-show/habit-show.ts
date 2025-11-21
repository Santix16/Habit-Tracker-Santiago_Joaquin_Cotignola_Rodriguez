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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { HabitDetail } from '../../habit-detail/habit-detail/habit-detail';
import { EditHabit } from '../../edit-habit/edit-habit/edit-habit';



@Component({
  selector: 'app-habits-show',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    HabitFilterPipe,
    HabitAddComponent,
    HabitItemComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    HabitDetail,
    EditHabit
  ],
  templateUrl: './habit-show.html',
  styleUrls: ['./habit-show.css']
})
export class HabitsShow implements OnInit {
  habits: Habit[] = [];
  selectedHabit: Habit | null = null;
  search: string = '';
  newHabit: Habit = this.getEmptyHabit();
  filterCategory: string = '';
  filterType: string = '';
  showNewHabitForm: boolean = false;
  editingHabit: any = null;
  creationError: string = '';

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.loadHabits();
  }

  toggleNewHabitForm() {
    this.showNewHabitForm = !this.showNewHabitForm;
  }


  /** 🔹 Cargar hábitos desde el servicio */
  loadHabits(): void {
    this.habitService
      .getHabits()
      .pipe(
        catchError(err => {
          console.error('Error cargando hábitos:', err);
          return of([]);
        })
      )
      .subscribe(data => (this.habits = data));
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

  addHabit(nuevoHabit?: Habit): void {
  const habit = nuevoHabit || this.newHabit;

  // Verificación de campos obligatorios
  if (!habit.name || !habit.category || !habit.goalType || !habit.status) {
    this.creationError = 'Debes completar todos los campos obligatorios para crear un hábito.';
    return;
  }

  habit.id = undefined;
  this.creationError = '';

  this.habitService.addHabit(habit).pipe(
    catchError(err => {
      console.error('Error al añadir hábito:', err);
      this.creationError = 'No se pudo conectar con el servidor. Revisa tu conexión o intenta más tarde.';
      return of(null);
    })
  ).subscribe(habitFromServer => {
    if (habitFromServer) {
      this.habits = [...this.habits, habitFromServer];
      this.newHabit = this.getEmptyHabit();
      this.showNewHabitForm = false;
      this.creationError = '';
    }
  });
}


  /** 🔹 Eliminar hábito */
  deleteHabit(habitToDelete: Habit): void {
    if (!habitToDelete.id) return;

    this.habitService
      .deleteHabit(habitToDelete.id)
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

  /** 🔹 Obtener categorías únicas */
  getUniqueCategories(): string[] {
    return [...new Set(this.habits.map(h => h.category))];
  }

  /** 🔹 Obtener tipos únicos */
  getUniqueTypes(): string[] {
    return [...new Set(this.habits.map(h => h.goalType))];
  }

  /** 🔹 Limpiar filtros */
  clearFilters(): void {
    this.search = '';
    this.filterCategory = '';
    this.filterType = '';
  }

  /** 🔹 Filtrar hábitos */
  filteredHabits(): Habit[] {
    return this.habits.filter(habit => {
      const matchesSearch = habit.name.toLowerCase().includes(this.search.toLowerCase());
      const matchesCategory = !this.filterCategory || habit.category === this.filterCategory;
      const matchesType = !this.filterType || habit.goalType === this.filterType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }

  /** 🔹 Ordenar hábitos */
  orderBy(criteria: string): void {
    switch (criteria) {
      case 'name':
        this.habits.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        this.habits.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'status':
        this.habits.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }
  }

  viewDetails(habit: Habit) {
  this.selectedHabit = habit;
}

closeDetails() {
  this.selectedHabit = null;
}

  /** 🔹 TrackBy seguro */
  trackById(index: number, habit: Habit): string | number {
    return habit.id ?? index;
  }

  openEdit(habit: any) {
  this.editingHabit = { ...habit }; // copia para edición segura
  }

  closeEdit() {
    this.editingHabit = null;
  }

saveHabit(updatedHabit: Habit) {
  const index = this.habits.findIndex(h => h.id === updatedHabit.id);
  if (index > -1) this.habits[index] = updatedHabit;

  if (this.selectedHabit?.id === updatedHabit.id) {
    this.selectedHabit = updatedHabit;
  }

  this.editingHabit = null;
}

closeError() {
  this.creationError = '';
}


}



