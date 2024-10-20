import { Component, Input, OnInit } from '@angular/core';
import jsonData from '../../utils/init.json';
import jsonTeam from '../../utils/teams.json';
import jsonResults from '../../utils/results.json';
import { CommonModule } from '@angular/common';

interface KnockoutRound {
  id: string;
  event_id: string;
  name: string;
  team1_id: string;
  team2_id: string;
}

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
  cellContent: { [key: number]: { left: string, right?: string } } = {};

  event!: any;
  knockoutRounds!: any[];
  quarterfinal1!: any;
  quarterfinal2!: any;
  quarterfinal3!: any;
  quarterfinal4!: any;
  semifinal1!: any;
  semifinal2!: any;
  final!: any;
  consolationfinal!: any;

  ngOnInit() {
    this.loading = true;
  
    if (this.eventId) {
      this.event = jsonData.event.find(e => e.id === this.eventId);

      this.knockoutRounds = jsonData.knockout_round.filter(k => k.event_id === this.eventId);

      this.quarterfinal1 = this.knockoutRounds.find(k => k.name === 'qf1');
      this.quarterfinal2 = this.knockoutRounds.find(k => k.name === 'qf2');
      this.quarterfinal3 = this.knockoutRounds.find(k => k.name === 'qf3');
      this.quarterfinal4 = this.knockoutRounds.find(k => k.name === 'qf4');

      this.semifinal1 = this.knockoutRounds.find(k => k.name === 'sf1');
      this.semifinal2 = this.knockoutRounds.find(k => k.name === 'sf2');
      this.final = this.knockoutRounds.find(k => k.name === 'f');
      this.consolationfinal = this.knockoutRounds.find(k => k.name === 'cf');
    } else {
      console.error('No eventId provided!');
    }

    this.cellContent = {
      // headers
      0: { left: 'Quarterfinal' },
      1: { left: 'Rounds' },
      4: { left: 'Semifinal' },
      5: { left: 'Rounds' },
      8: { left: 'Final' },
      9: { left: 'Round' },
      12: { left: 'Consolation' },
      13: { left: 'Round' },
      // round information
      28: { left: this.quarterfinal1 ? this.getTeamAbb(this.quarterfinal1, 'team1') : 'N/A' },
      29: { left: this.quarterfinal1 ? this.getTeamImg(this.quarterfinal1, 'team1') : 'N/A',  right: '10' },
      42: { left: this.quarterfinal1 ? this.getTeamAbb(this.quarterfinal1, 'team2') : 'N/A' },
      43: { left: this.quarterfinal1 ? this.getTeamImg(this.quarterfinal1, 'team2') : 'N/A',  right: '20' },
      84: { left: this.quarterfinal2 ? this.getTeamAbb(this.quarterfinal2, 'team1') : 'N/A' },
      85: { left: this.quarterfinal2 ? this.getTeamImg(this.quarterfinal2, 'team1') : 'N/A',  right: '30' },
      98: { left: this.quarterfinal2 ? this.getTeamAbb(this.quarterfinal2, 'team2') : 'N/A' },
      99: { left: this.quarterfinal2 ? this.getTeamImg(this.quarterfinal2, 'team2') : 'N/A',  right: '40' },
      140: { left: this.quarterfinal3 ? this.getTeamAbb(this.quarterfinal3, 'team1') : 'N/A' },
      141: { left: this.quarterfinal3 ? this.getTeamImg(this.quarterfinal3, 'team1') : 'N/A',  right: '10' },
      154: { left: this.quarterfinal3 ? this.getTeamAbb(this.quarterfinal3, 'team2') : 'N/A' },
      155: { left: this.quarterfinal3 ? this.getTeamImg(this.quarterfinal3, 'team2') : 'N/A',  right: '20' },
      196: { left: this.quarterfinal4 ? this.getTeamAbb(this.quarterfinal4, 'team1') : 'N/A' },
      197: { left: this.quarterfinal4 ? this.getTeamImg(this.quarterfinal4, 'team1') : 'N/A',  right: '30' },
      210: { left: this.quarterfinal4 ? this.getTeamAbb(this.quarterfinal4, 'team2') : 'N/A' },
      211: { left: this.quarterfinal4 ? this.getTeamImg(this.quarterfinal4, 'team2') : 'N/A',  right: '40' },

      60: { left: this.semifinal1 ? this.getTeamAbb(this.semifinal1, 'team1') : 'N/A' },
      61: { left: this.semifinal1 ? this.getTeamImg(this.semifinal1, 'team1') : 'N/A',  right: '40' },
      74: { left: this.semifinal1 ? this.getTeamAbb(this.semifinal1, 'team2') : 'N/A' },
      75: { left: this.semifinal1 ? this.getTeamImg(this.semifinal1, 'team2') : 'N/A',  right: '40' },
      172: { left: this.semifinal2 ? this.getTeamAbb(this.semifinal2, 'team1') : 'N/A' },
      173: { left: this.semifinal2 ? this.getTeamImg(this.semifinal2, 'team1') : 'N/A',  right: '40' },
      186: { left: this.semifinal2 ? this.getTeamAbb(this.semifinal2, 'team1') : 'N/A' },
      187: { left: this.semifinal2 ? this.getTeamImg(this.semifinal2, 'team1') : 'N/A',  right: '40' },

      120: { left: this.final ? this.getTeamAbb(this.final, 'team1') : 'N/A' },
      121: { left: this.final ? this.getTeamImg(this.final, 'team1') : 'N/A',  right: '40' },
      134: { left: this.final ? this.getTeamAbb(this.final, 'team2') : 'N/A' },
      135: { left: this.final ? this.getTeamImg(this.final, 'team2') : 'N/A',  right: '40' },
      124: { left: this.consolationfinal ? this.getTeamAbb(this.consolationfinal, 'team1') : 'N/A' },
      125: { left: this.consolationfinal ? this.getTeamImg(this.consolationfinal, 'team1') : 'N/A',  right: '40' },
      138: { left: this.consolationfinal ? this.getTeamAbb(this.consolationfinal, 'team2') : 'N/A' },
      139: { left: this.consolationfinal ? this.getTeamImg(this.consolationfinal, 'team2') : 'N/A',  right: '40' },      
    };

    this.loading = false;
  }

  getTeamAbb(round: KnockoutRound, teamType: 'team1' | 'team2'): string {
    const teamId = teamType === 'team1' ? round.team1_id : round.team2_id;
    const eventId = round.event_id;
    const team = jsonTeam.team.find(t => t.id === teamId && t.event_id === eventId);
    if (!team) {
      console.log(`Team with id ${teamId} in event ${eventId} not found!`);
    }
    return team && team.abb ? team.abb : 'N/A';
  }

  getTeamImg(round: KnockoutRound, teamType: 'team1' | 'team2'): string {
    const teamId = teamType === 'team1' ? round.team1_id : round.team2_id;
    const eventId = round.event_id;
    const team = jsonTeam.team.find(t => t.id === teamId && t.event_id === eventId);
    if (!team) {
      console.log(`Team with id ${teamId} in event ${eventId} not found!`);
    }
    return team && team.image ? team.image : 'N/A';
  }

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

  isBorderTopBlack(index: number): boolean {
    return [
      0, 1, 4, 5, 8, 9, 12, 13, 28, 29, 42, 43, 84, 85, 98, 99, 140, 141, 154, 155, 196, 197, 210, 211, 60, 61, 74, 75, 172, 173, 186, 187, 120, 121, 134, 135, 124, 125, 138, 139,
      14, 15, 18, 19, 22, 23, 26, 27, 56, 57, 98, 99, 112, 113, 154, 155, 168, 169, 210, 211, 88, 89, 200, 201, 148, 149, 152, 153
    ].includes(index);
  }

  isBorderBottomBlack(index: number): boolean {
    return [210, 211].includes(index);
  }

  isBorderRightBlack(index: number): boolean {
    return [
      1, 5, 9, 13, 29, 43, 85, 99, 141, 155, 197, 211, 61, 75, 173, 187, 121, 135, 125, 139
    ].includes(index);
  }

  isBorderLeftBlack(index: number): boolean {
    return [
      0, 4, 8, 12, 28, 42, 84, 98, 140, 154, 196, 210, 60, 74, 172, 186, 120, 134, 124, 138, 
    ].includes(index);
  }
}

