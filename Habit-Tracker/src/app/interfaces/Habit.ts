import { HabitProgress } from './HabitProgress';

export interface Habit {
  id: string;
  name: string;
  category: string;
  goalType: 'daily' | 'weekly' | 'monthly';
  status: 'In Progress' | 'Completed' | 'Paused';
  notes: string;
  progress: HabitProgress[];
}
