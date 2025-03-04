import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-tournament',
    imports: [
        TableModule,
        IconFieldModule,
        InputTextModule,
        InputIconModule,
        MultiSelectModule,
        DropdownModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    templateUrl: './tournament.component.html',
    styleUrl: './tournament.component.scss'
})
export class TournamentComponent implements OnInit {

  competition!: any;
  tournament!: any;
  events!: any[];

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.params.subscribe(params => {
      const tournamentId = params['id'];

    //   this.tournament = jsonData.tournament.find(t => t.id == tournamentId);
      const competitionId = this.tournament.competition_id;

      if (!this.tournament) {
        console.error('Tournament not found!');
        // Optionally, navigate to a 404 page or show an error message
      } else {
        // this.events = jsonData.event.filter(e => e.tournament_id == tournamentId);
        // this.competition = jsonData.competition.find(c => c.id == competitionId);
      }
      this.loading = false;
    });
  };

  onGlobalFilter(event: Event, dt2: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt2.filterGlobal(inputValue, 'contains');
  }

  onEventClick(tournament: any) {
    this.router.navigate(['/event', tournament.id]); // Navigate to competition detail
  }
}
