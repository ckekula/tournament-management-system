import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Organization } from '../../../types/account';

@Component({
  selector: 'app-new-org',
  imports: [
    Dialog, InputText, ReactiveFormsModule
  ],
  templateUrl: './new-org.component.html',
  styleUrl: './new-org.component.scss'
})
export class NewOrgComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() organizationCreated = new EventEmitter<Organization>();

  organizationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.organizationForm = this.fb.group({
      id: [this.generateUniqueId()],
      name: ['', [Validators.required, Validators.minLength(2)]],
      abbreviation: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(5)
      ]],
    });
  }

  private generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000);
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
      id: this.generateUniqueId(),
      name: '',
      abbreviation: ''
    });
  }

  closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
