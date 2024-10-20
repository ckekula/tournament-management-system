import { Component, Input, OnInit } from '@angular/core';
import jsonData from '../../utils/init.json';
import jsonTeam from '../../utils/teams.json';
import jsonResults from '../../utils/results.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-knockout-stage',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './knockout-stage.component.html',
  styleUrl: './knockout-stage.component.scss'
})
export class KnockoutStageComponent {

  cells = Array(16 * 14).fill('');

  @Input() eventId!: string;

  loading: boolean = true;
  event!: any;
  knockoutStage!: any;
  knockoutRounds!: any[];
  quaterfinal_1!: any;
  qf1Team1Id!: any;
  qf1Team2Id!: any;
  qf1Team1name!: any;
  qf1Team2name!: any;
  organizations!: any[];

  ngOnInit() {
    this.loading = true;

    // this.knockoutStage = jsonData.knockout_stage.find(ks => ks.event_id === this.eventId);

    this.knockoutRounds = jsonData.knockout_round.filter(kr => 
      kr.knockout_stage_id == this.knockoutStage
    );

    this.quaterfinal_1 = this.knockoutRounds.find(kr => kr.name === 'Quaterfinal_1');
    this.qf1Team1Id = this.quaterfinal_1.team_1;
    this.qf1Team2Id = this.quaterfinal_1.team_2;

    this.organizations = jsonTeam.team?.filter(t => t.org_id);

    this.loading = false;
  }

  getTeamName(teamId: string) {
    return jsonTeam.team.find(t => t.id === teamId)?.name;
  }

  cellContent: { [key: number]: { left: string, right?: string } } = {
    0: { left: 'Quaterfinal'},
    1: { left: 'Rounds'},
    4: { left: 'Semifinal'},
    5: { left: 'Rounds'},
    8: { left: 'Final'},
    9: { left: 'Round'},
    12: { left: 'Consolation'},
    13: { left: 'Round'},

    28: { left: this.getTeamName(this.qf1Team1Id) || ''}, 
    29: { left: 'Img', right: '10' },
    42: { left: 'UOP'},
    43: { left: 'Img', right: '20' },
  };

  getCellContent(index: number): { left: string, right?: string } | null {
    return this.cellContent[index] || null;
  }

  // Determine if a cell has two items or not
  hasTwoItems(index: number): boolean {
    const content = this.cellContent[index];
    return content && content.right !== undefined;
  }
  isBorderTopBlue(index: number): boolean {
    return [44, 100, 156, 212, 73, 185, 76, 188, 133, 136, 137].includes(index);
  }

  isBorderRightBlue(index: number): boolean {
    return [
      44, 58, 72, 86, 156, 170, 184, 198, 76, 90, 104, 118, 132, 146, 160, 174
    ].includes(index);
  }

  isColoredCell(index: number): boolean {
    return [
      0, 1, 4, 5, 8, 9, 12, 13, 28, 29, 42, 43, 84, 85, 98, 99, 140, 141, 154, 155, 196, 197, 210, 211, 60, 61, 74, 75, 172, 173, 186, 187, 120, 121, 134, 135, 124, 125, 138, 139
    ].includes(index);
  }
}

