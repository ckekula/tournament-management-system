import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Activity } from '../../../types/models';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-activity',
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.scss'
})
export class AddActivityComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() activityCreated = new EventEmitter<Activity>();

  activityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      abbreviation: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(5)
      ]],
    });
  }

  submit(): void {
    if (this.activityForm.valid) {
      this.activityCreated.emit(this.activityForm.value);
      this.resetForm();
      this.closeDialog();
    }
  }

  resetForm(): void {
    this.activityForm.reset({
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
