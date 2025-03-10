import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Organization } from '../../../types/models';

@Component({
  selector: 'app-org-card',
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './org-card.component.html',
  styleUrl: './org-card.component.scss'
})
export class OrgCardComponent {
  @Input() organization!: Organization;
  @Output() view = new EventEmitter<Organization>();

  onView(): void {
    this.view.emit(this.organization);
  }
}
