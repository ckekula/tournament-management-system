import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
// import { competition, Representative } from '@domain/competition';
// import { competitionService } from '@service/competitionservice';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-competitions',
    templateUrl: './competitions.component.html',
    standalone: true,
    imports: [
      TableModule,
      TagModule, 
      IconFieldModule, 
      InputTextModule,
      InputIconModule, 
      MultiSelectModule,
      DropdownModule,
      CommonModule,
      FormsModule
    ],
    // providers: [competitionService]
})
export class CompetitionsComponent implements OnInit {

  // competitions!: competition[];

  // representatives!: Representative[];

  competitions!: any[];

  organizers!: any[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  // constructor(private competitionService: competitionService) {}

  ngOnInit() {
    // this.competitionService.getcompetitionsLarge().then((competitions) => {
    //     this.competitions = competitions;
    //     this.loading = false;

    //     this.competitions.forEach((competition) => (competition.date = new Date(<Date>competition.date)));
    // });

    this.loading = true;  // Start the loading state

    this.competitions = [
      { id: 1, name: 'Sri Lanka University Games', year: '2023', organizer: 'Amy Elsner', status: 'completed' },
      { id: 2, name: 'Inter University Games', year: '2024', organizer: 'Anna Fali', status: 'ongoing' },
      { id: 3, name: 'National University Games', year: '2025', organizer: 'Bernardo Dominic', status: 'not_started' }
    ];

    this.organizers = [
        { name: 'Amy Elsner', image: 'assets/amy.jpg' },
        { name: 'Anna Fali', image: 'assets/hero.jpg' },
        { name: 'Asiya Javayant', image: 'assets/hero.jpg' },
        { name: 'Bernardo Dominic', image: 'assets/hero.jpg' },
    ];

    this.statuses = [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Not Started', value: 'not_started' },
    ];

    this.loading = false;

  }

  clear(table: Table) {
      table.clear();
  }

  getSeverity(status: string) {
      switch (status) {
          case 'completed':
              return 'success';

          case 'ongoing':
              return 'info';

          case 'not_started':
              return 'warning';
          default:
            return 'secondary';
      }
  }

  getOrganizerImage(organizerName: string) {
    const organizer = this.organizers.find(o => o.name === organizerName);
    return organizer ? organizer.image : 'path/to/default/image.png'; // Fallback image if not found
  }
  
  onGlobalFilter(event: Event, dt2: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt2.filterGlobal(inputValue, 'contains');
  }

  onCompetitionClick(competition: any) {

    console.log('Competition clicked:', competition);
    // this.router.navigate(['/competition', competition.id]);
  }
}