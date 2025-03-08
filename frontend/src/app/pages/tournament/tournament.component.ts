import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Tournament } from '../../types/models';
import { HeaderComponent } from "../../components/shared/header/header.component";
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { ActivityTableComponent } from "../../components/tournament/activity-table/activity-table.component";
import { TournaStandingsComponent } from "../../components/tournament/tourna-standings/tourna-standings.component";
import { TopThreeComponent } from "../../components/shared/top-three/top-three.component";

@Component({
  selector: 'app-tournament',
  imports: [
    CommonModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    ActivityTableComponent,
    TournaStandingsComponent,
    TopThreeComponent
],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss'
})
export class TournamentComponent {

}
