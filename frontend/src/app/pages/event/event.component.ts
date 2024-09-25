import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import jsonData from '../../utils/init.json';


@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    TabViewModule, 
    BadgeModule
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit{

  competition!: any;
  tournament!: any;
  event!: any;

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.params.subscribe(params => {
      const eventId = params['id'];

      this.event = jsonData.event.find(e => e.id == eventId);
      const tournamentId = this.event.tournament_id;

      if (!this.event) {
        console.error('Event not found!');
        // Optionally, navigate to a 404 page or show an error message
      } else {
        this.tournament = jsonData.tournament.find(t => t.id == tournamentId);
        const competitionId = this.tournament.competition_id;
        this.competition = jsonData.competition.find(c => c.id == competitionId);
      }

      this.loading = false;
    });
  };

  getTournament() {
    return this.tournament.name;
  }

  getEvent() {
    return this.event.name;
  }

  onGlobalFilter(event: Event, dt2: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt2.filterGlobal(inputValue, 'contains');
  }
}
