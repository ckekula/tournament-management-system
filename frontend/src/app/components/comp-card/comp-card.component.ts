import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Competition } from '../../../types/competition';

@Component({
  selector: 'app-comp-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './comp-card.component.html',
  styleUrl: './comp-card.component.scss'
})
export class CompCardComponent {

  competition!: Competition;
  
  editCompetition(comp: Competition) {}

  deleteCompetition(comp: Competition) {}
}
