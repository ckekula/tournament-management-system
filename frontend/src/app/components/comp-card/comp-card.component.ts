import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Competition } from '../../../types/competition';

@Component({
    selector: 'app-comp-card',
    imports: [
        CommonModule
    ],
    templateUrl: './comp-card.component.html',
    styleUrl: './comp-card.component.scss'
})
export class CompCardComponent {
  @Input() competition!: Competition;
  
  editCompetition(comp: Competition) {}

  deleteCompetition(comp: Competition) {}
}
