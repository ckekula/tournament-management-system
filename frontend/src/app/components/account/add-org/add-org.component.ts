import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Organization } from '../../../types/models';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-org',
  imports: [
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './add-org.component.html',
  styleUrl: './add-org.component.scss'
})
export class AddOrgComponent {

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() organizationCreated = new EventEmitter<Organization>();

  organizationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.organizationForm = this.fb.group({
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
    if (this.organizationForm.valid) {
      this.organizationCreated.emit(this.organizationForm.value);
      this.resetForm();
      this.closeDialog();
    }
  }

  resetForm(): void {
    this.organizationForm.reset({
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
