import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from "../../../components/shared/footer/footer.component";
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { Router } from '@angular/router';
import { CompCardComponent } from '../../../components/comp-card/comp-card.component';
import { CommonModule } from '@angular/common';
import { Competition } from '../../../../types/competition';
import { CompetitionService } from '../../../graphql/services/competition.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-organization',
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
  public competitions: Competition[] = [];
  private organizationId: string = '';
  public organizationName: string = '';

  constructor(
    private competitionService: CompetitionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get organization ID from URL
    this.route.params.subscribe(params => {
      this.organizationId = params['id'];
      this.loadCompetitions();
    });
  }

  private loadCompetitions(): void {
    this.competitionService.getCompetitionsByOrganizer(this.organizationId)
      .pipe(
        map(response => response.data.getCompetitionsByOrganizer)
      )
      .subscribe({
        next: (competitions: Competition[]) => {
          this.competitions = competitions;
          if (competitions.length > 0) {
            this.organizationName = competitions[0].organization;
          }
        },
        error: (error) => {
          console.error('Error fetching competitions:', error);
          // Handle error appropriately - you might want to show a notification
        }
      });
  }

  addCompetition() {
    this.router.navigate(['/competition/new'], {
      queryParams: { organizationId: this.organizationId }
    });
  }

  getOrgName(): string {
    return this.organizationName || 'Organization';
  }
}