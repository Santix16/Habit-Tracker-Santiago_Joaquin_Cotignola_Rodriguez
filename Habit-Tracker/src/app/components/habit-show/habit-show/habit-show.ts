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
import { MatSnackBar } from '@angular/material/snack-bar';



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
  orderCriteria: string = '';
  orderDirection: 'asc' | 'desc' = 'asc';

  constructor(private habitService: HabitService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadHabits();
  }

  toggleNewHabitForm() {
    this.showNewHabitForm = !this.showNewHabitForm;
  }


  loadHabits(): void {
    this.habitService
    .getHabits()
    .pipe(
      catchError(err => {
        console.error('Error cargando hábitos:', err);

        this.snackBar.open(
          'No se pudieron cargar los hábitos. Revisa la conexión al servidor.',
          '',
          {
            duration: 0,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          }
        );

        return of([]);
      })
    )
    .subscribe(data => (this.habits = data));
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

  addHabit(nuevoHabit?: Habit): void {
  const habit = nuevoHabit || this.newHabit;

  if (!habit.name || !habit.category) {
    this.snackBar.open(
      'Debes completar todos los campos obligatorios para crear un hábito.',
      '',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      }
    );
    return;
  }

  habit.id = undefined;

  this.habitService.addHabit(habit).pipe(
    catchError(err => {
      console.error('Error al añadir hábito:', err);
      this.snackBar.open(
        'No se pudo conectar con el servidor. Revisa tu conexión o intenta más tarde.',
        '',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        }
      );
      return of(null);
    })
  ).subscribe(habitFromServer => {
    if (habitFromServer) {
      this.habits = [...this.habits, habitFromServer];
      this.newHabit = this.getEmptyHabit();
      this.showNewHabitForm = false;

      this.snackBar.open('Hábito creado exitosamente', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });
    }
  });
}


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

  getUniqueCategories(): string[] {
    return [...new Set(this.habits.map(h => h.category))];
  }

  getUniqueTypes(): string[] {
    return [...new Set(this.habits.map(h => h.goalType))];
  }

  clearFilters(): void {
    this.search = '';
    this.filterCategory = '';
    this.filterType = '';
  }

  filteredHabits(): Habit[] {
    return this.habits.filter(habit => {
      const matchesSearch = habit.name.toLowerCase().includes(this.search.toLowerCase());
      const matchesCategory = !this.filterCategory || habit.category === this.filterCategory;
      const matchesType = !this.filterType || habit.goalType === this.filterType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }

  orderBy(criteria: string): void {
  if (this.orderCriteria === criteria) {
    this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.orderCriteria = criteria;
    this.orderDirection = 'asc';
  }

  const dir = this.orderDirection === 'asc' ? 1 : -1;

  const sorted = [...this.habits].sort((a, b) => {
    const valA = ((a as any)[criteria] ?? '').toString().toLowerCase();
    const valB = ((b as any)[criteria] ?? '').toString().toLowerCase();
    if (valA < valB) return -1 * dir;
    if (valA > valB) return 1 * dir;
    return 0;
  });

  this.habits = sorted;
}

  viewDetails(habit: Habit) {
  this.selectedHabit = habit;
}

closeDetails() {
  this.selectedHabit = null;
}

  trackById(index: number, habit: Habit): string | number {
    return habit.id ?? index;
  }

  openEdit(habit: any) {
  this.editingHabit = { ...habit };
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



