import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CommonModule } from '@angular/common';
import { KnockoutStageComponent } from "../../../components/knockout-stage/knockout-stage.component";
import { GroupStageComponent } from '../../../components/group-stage/group-stage.component';
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef

@Component({
    selector: 'app-event',
    imports: [
        TabViewModule,
        BadgeModule,
        CommonModule,
        ScrollPanelModule,
        KnockoutStageComponent,
        GroupStageComponent,
        RouterModule
    ],
    templateUrl: './event.component.html',
    styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit{

  competition!: any;
  tournament!: any;
  event!: any;
  stages!: any[];

  loading: boolean = true;
  eventId!: string;

  winnerNames: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.params.subscribe(params => {
      const eventId = params['id'];

    //   this.event = jsonData.event.find(e => e.id == eventId);

      if (!this.event) {
        console.error('Event not found!');
        // Optionally, navigate to a 404 page or show an error message
      } else {
        // this.stages = jsonData.stage.filter(s => s.event_id == eventId);

        // const tournamentId = this.event.tournament_id;
        // this.tournament = jsonData.tournament.find(t => t.id == tournamentId);

        // const competitionId = this.tournament.competition_id;
        // this.competition = jsonData.competition.find(c => c.id == competitionId);
      }

      this.loading = false;
    });
  };

  onWinnersReceived(winners: string[]) {
    this.winnerNames = winners;
    this.cdr.detectChanges(); // Manually trigger change detection
  }
}
