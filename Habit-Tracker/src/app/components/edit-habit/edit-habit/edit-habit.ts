import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

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

  @Input() habit: any;
  @Output() onClose = new EventEmitter<void>();

  constructor() {}

  save() {
    // Aquí ya guardas con tu servicio si quieres
    this.onClose.emit();
  }

  cancel() {
    this.onClose.emit();
  }
}


