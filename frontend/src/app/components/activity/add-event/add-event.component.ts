import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { _Event } from '../../../types/models';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-event',
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() eventCreated = new EventEmitter<_Event>();

  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      id: [''],
      name: [''],
      category: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  submit(): void {
    if (this.eventForm.valid) {
      this.eventCreated.emit(this.eventForm.value);
      this.resetForm();
      this.closeDialog();
    }
  }

  resetForm(): void {
    this.eventForm.reset({
      id: '',
      name: '',
      abbreviation: ''
    });
  }

  closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
