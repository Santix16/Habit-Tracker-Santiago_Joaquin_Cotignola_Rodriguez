import { Pipe, PipeTransform } from '@angular/core';
import { Habit } from '../interfaces/Habit';

@Pipe({
  name: 'habitFilter',
  standalone: true
})
export class HabitFilterPipe implements PipeTransform {
  transform(habits: Habit[], search: string): Habit[] {
    if (!habits) return [];
    if (!search) return habits;

    const term = search.toLowerCase();
    return habits.filter(habit =>
      habit.name.toLowerCase().includes(term) ||
      habit.category.toLowerCase().includes(term) ||
      habit.notes.toLowerCase().includes(term) ||
      habit.goalType.toLowerCase().includes(term) ||
      habit.status.toLowerCase().includes(term)
    );
  }
}
