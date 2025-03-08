import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Tournament } from '../../../types/models';

@Component({
  selector: 'app-add-tourna',
  imports: [
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './add-tourna.component.html',
  styleUrl: './add-tourna.component.scss'
})
export class AddTournaComponent {

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() tournamentCreated = new EventEmitter<Tournament>();

  tournamentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tournamentForm = this.fb.group({
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
    if (this.tournamentForm.valid) {
      this.tournamentCreated.emit(this.tournamentForm.value);
      this.resetForm();
      this.closeDialog();
    }
  }

  resetForm(): void {
    this.tournamentForm.reset({
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
