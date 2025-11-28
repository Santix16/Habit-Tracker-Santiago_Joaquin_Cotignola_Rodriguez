import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Habit } from '../../../interfaces/Habit';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-habit',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './edit-habit.html'
})
export class EditHabit {

  @Input() habit!: Habit;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Habit>();

  constructor(private snackBar: MatSnackBar) {}

  save() {
    if (!confirm('¿Estás seguro de querer actualizar este hábito?')) return;

    this.onSave.emit(this.habit); 

    this.snackBar.open('Hábito actualizado exitosamente', '', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['custom-snackbar']
  });
  }

  cancel() {
    this.onClose.emit(); 
  }
}



