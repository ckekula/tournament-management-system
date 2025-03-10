import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Tournament } from '../../../types/models';

@Component({
  selector: 'app-tourna-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './tourna-card.component.html',
  styleUrl: './tourna-card.component.scss'
})
export class TournaCardComponent {
  @Input() tournament!: Tournament;
  @Output() view = new EventEmitter<Tournament>();

  onView(): void {
    this.view.emit(this.tournament);
  }
}
