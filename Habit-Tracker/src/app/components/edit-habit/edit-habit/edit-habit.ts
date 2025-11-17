import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Habit } from '../../../interfaces/Habit';

@Component({
  selector: 'app-edit-habit',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './edit-habit.html'
})
export class EditHabit {

  @Input() habit!: Habit;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Habit>();

  constructor() {}

  save() {
    this.onSave.emit(this.habit); 
  }

  cancel() {
    this.onClose.emit(); 
  }
}



