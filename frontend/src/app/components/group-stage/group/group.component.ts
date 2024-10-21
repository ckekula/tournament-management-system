import { Component, Input } from '@angular/core';
import jsonData from '../../../utils/init.json';
import jsonTeam from '../../../utils/teams.json';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule,
    TableModule
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
  @Input() groupId!: string;

  loading: boolean = true;
  group!: any;
  groupRounds!: any[];
  teamsStats: { [teamId: string]: { wins: number, losses: number, ties: number } } = {};
  
  ngOnInit() {
    this.loading = true;
    if (this.groupId) {
      this.groupRounds = jsonData.group_round.filter(g => g.group_id === this.groupId);

      // Initialize teams stats
      this.initializeTeamsStats();

      // Calculate stats for each team
      this.calculateTeamStats();
    } else {
      console.error('Group not found!');
    }
    
    this.loading = false;
  }

  // Initialize teams stats object
  initializeTeamsStats() {
    const teamIds = new Set<string>();
    this.groupRounds.forEach(round => {
      teamIds.add(round.team1_id);
      teamIds.add(round.team2_id);
    });

    teamIds.forEach(teamId => {
      this.teamsStats[teamId] = { wins: 0, losses: 0, ties: 0};
    });
  }

  // Calculate team stats (wins, losses, ties)
  calculateTeamStats() {
    this.groupRounds.forEach(round => {
      const team1Score = parseInt(round.team1_score);
      const team2Score = parseInt(round.team2_score);

      if (team1Score > team2Score) {
        this.teamsStats[round.team1_id].wins += 1;
        this.teamsStats[round.team2_id].losses += 1;
      } else if (team1Score < team2Score) {
        this.teamsStats[round.team2_id].wins += 1;
        this.teamsStats[round.team1_id].losses += 1;
      } else {
        this.teamsStats[round.team1_id].ties += 1;
        this.teamsStats[round.team2_id].ties += 1;
      }
    });
  }

  // Convert teamsStats object to an array
  getTeamsStatsArray() {
    return Object.keys(this.teamsStats).map(teamId => ({
      teamId,
      ...this.teamsStats[teamId]
    }));
  }

  // Get team name by team ID
  getTeamName(teamId: string): string {
    const team = jsonTeam.team.find(t => t.id === teamId);
    return team?.name ?? 'Unknown Team';
  }

  // Calculate points based on wins and ties
  calculatePoints(wins: number, ties: number): number {
    return wins * 3 + ties; // 3 points for a win, 1 point for a tie
  }

  // Calculate score difference
  calcScoreDifference(teamId: string): number {
    let totalScored = 0;
    let totalConceded = 0;

    this.groupRounds.forEach(round => {
      if (round.team1_id === teamId) {
        totalScored += parseInt(round.team1_score);
        totalConceded += parseInt(round.team2_score);
      } else if (round.team2_id === teamId) {
        totalScored += parseInt(round.team2_score);
        totalConceded += parseInt(round.team1_score);
      }
    });

    return totalScored - totalConceded;
  }

}
