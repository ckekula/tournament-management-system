import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import jsonData from '../../utils/init.json'
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comp-details',
  standalone: true,
  imports: [
    RippleModule,
    ButtonModule,
    TagModule,
    TableModule,
    IconFieldModule, 
    InputTextModule,
    InputIconModule, 
    MultiSelectModule,
    DropdownModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './comp-details.component.html',
  styleUrls: ['./comp-details.component.scss']  // Make sure this is 'styleUrls' with an 's'
})
export class CompDetailsComponent implements OnInit {

  competition!: any;  // Holds the competition details
  status!: any[];
  tournament!: any[];

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;  // Start the loading state

    // Subscribe to route params to get the competition ID
    this.route.params.subscribe(params => {
      const competitionId = params['id'];  // Retrieve 'id' from the route params

      // Find the relevant competition from the JSON data
      this.competition = jsonData.competition.find(c => c.id == competitionId);

      // Check if the competition exists
      if (!this.competition) {
        console.error('Competition not found!');
        // Optionally, navigate to a 404 page or show an error message
      } else {
        // If competition exists, you can load related tournaments
        this.tournament = jsonData.tournament.filter(t => t.competition_id == competitionId);
      }
      this.loading = false;  // Stop loading once data is retrieved
    });

  };

  getStatus() {
    return this.competition.status;
  }

  getSeverity(status: string) {
    switch (status) {
        case 'completed':
            return 'success';
        case 'ongoing':
            return 'info';
        case 'yet to start':
            return 'warning';
        default:
          return 'secondary';
    }
  }

  getCompetition() {
    return this.competition.name;
  }

  onGlobalFilter(event: Event, dt2: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt2.filterGlobal(inputValue, 'contains');
  }

  onTournamentClick(tournament: any) {
    this.router.navigate(['/tournament', tournament.id]); // Navigate to competition detail
  }
}
