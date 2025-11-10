import { Routes } from '@angular/router';
import { HabitsShow } from './components/habit-show/habit-show/habit-show';
import { HabitDetail } from './components/habit-detail/habit-detail/habit-detail';

export const routes: Routes = [
  { path: '', component: HabitsShow },
  { path: 'habit/:id', component: HabitDetail }
];

