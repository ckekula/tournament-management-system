import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsonData from '../../utils/init.json';
import jsonTeam from '../../utils/teams.json';
import jsonResults from '../../utils/results.json';

@Component({
  selector: 'app-group-stage',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule, 
    InputTextModule,
    InputIconModule, 
    CommonModule
  ],
  templateUrl: './group-stage.component.html',
  styleUrl: './group-stage.component.scss'
})
export class GroupStageComponent {

  @Input() groupStage!: any;

  loading: boolean = true;
  event!: any;
  groupRounds!: any[];
  groupRoundTeams!: any[];
  organizations!: any[];
  grTeamScores!: any[];

  ngOnInit() {
    if (this.groupStage) {
      this.groupRounds = jsonData.group_round?.filter(gr => gr.group_stage_id === this.groupStage.id);
      this.groupRoundTeams = jsonResults.gr_team_score?.filter(grts => grts.team_id);
      this.grTeamScores = jsonResults.gr_team_score?.filter(grts => this.groupRoundTeams.includes(grts.team_id));
      this.organizations = jsonTeam.team?.filter(t => t.org_id);
    }
    this.loading = false;
  }

  getTeams() {
    return this.groupRoundTeams
  }

  onGlobalFilter(event: Event, dt2: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt2.filterGlobal(inputValue, 'contains');
  }

}
