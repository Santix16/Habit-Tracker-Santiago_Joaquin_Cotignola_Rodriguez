import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habit } from '../interfaces/Habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  private apiUrl = 'http://localhost:3000/habits'; // URL del json-server

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todos los hábitos
  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.apiUrl);
  }

  // 🔹 Obtener un hábito por ID
  getHabitById(id: string): Observable<Habit> {
    return this.http.get<Habit>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Añadir un nuevo hábito
  addHabit(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(this.apiUrl, habit);
  }

  // 🔹 Actualizar un hábito existente
  updateHabit(habit: Habit): Observable<Habit> {
    return this.http.put<Habit>(`${this.apiUrl}/${habit.id}`, habit);
  }

  // 🔹 Borrar un hábito por ID
  deleteHabit(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}