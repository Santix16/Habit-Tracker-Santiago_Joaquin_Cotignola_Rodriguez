import { Routes } from '@angular/router';
import { HabitsShow } from './components/habit-show/habit-show/habit-show';
import { HabitDetail } from './components/habit-detail/habit-detail/habit-detail';
import { EditHabit } from './components/edit-habit/edit-habit/edit-habit';

export const routes: Routes = [
  { path: '', component: HabitsShow },
  { path: 'habit/:id', component: HabitDetail },
  { path: 'habit/edit/:id', component: EditHabit }
];

