import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { Tournament } from '../../types/models';
import { HeaderComponent } from "../../components/shared/header/header.component";
import { FooterComponent } from '../../components/shared/footer/footer.component';

@Component({
  selector: 'app-organization',
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent {
  constructor(
    private router: Router,
  ) {}

  tournaments = [
    { id: 1, name: "Sri Lanka University Games", year: 2023 },
    { id: 2, name: "Sri Lanka University Games", year: 2025 },
    { id: 3, name: "Sri Lanka University Games", year: 2027 },
  ]

  newOrgVisible = false;

  toggleNewTournament(): void {
    this.newOrgVisible = true;
  }

  addTournament(tournament: Tournament): void {
    this.tournaments = [...this.tournaments, tournament];
  }

  viewTournament(tournament: Tournament): void {
    this.router.navigate(['/tournament', tournament.id]);
  }
}
