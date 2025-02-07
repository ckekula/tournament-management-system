import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../components/shared/footer/footer.component";
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { Router } from '@angular/router';
import { OrganizationService } from '../../../graphql/services/organization.service';
import { CompCardComponent } from '../../../components/comp-card/comp-card.component';
import { CommonModule } from '@angular/common';
import { Competition } from '../../../../types/competition';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    CompCardComponent
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit {

  competitions: Competition[] = [
    {
        name: 'Global Innovation Challenge',
        year: 2024,
        startDate: new Date('2024-03-15'),
        organization: 'Tech Innovators Inc.'
    },
    {
        name: 'Data Science Olympics',
        year: 2024,
        startDate: new Date('2024-04-01'),
        organization: 'DataMinds Academy'
    },
    {
        name: 'Startup Pitch Contest',
        year: 2024,
        startDate: new Date('2024-05-20'),
        organization: 'Venture Capital Partners'
    }
  ];

  constructor(
    private organizationService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void { }

  addCompetition() {
    this.router.navigate(['/view/comp/:id']);
  }

  getOrgName() {}

}
