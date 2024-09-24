import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsonData from '../../init.json';

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
})
export class CompetitionsComponent implements OnInit {

  constructor(private router: Router) {}

  competition!: any[];
  organizer!: any[];
  statuses!: any[];

  loading: boolean = true;

  ngOnInit() {
    this.loading = true;  // Start the loading state

    // Load data from jsonData instead of hardcoded data
    this.competition = jsonData.competition;

    this.organizer = jsonData.user.map(user => ({
      name: user.name,
      image: user.image
    }));

    // Define statuses from the JSON competition data
    this.statuses = [
        { label: 'Ongoing', value: 'Ongoing' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Not Started', value: 'Not Started' },
    ];

    this.loading = false;  // End the loading state
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
          case 'yet to start':
              return 'warning';
          default:
            return 'secondary';
      }
  }

  getOrganizerImage(organizerName: string) {
    const organizer = this.organizer.find(o => o.name === organizerName);
    
    // Check if the organizer exists and has a valid image path, otherwise return the default 'user.png'
    return (organizer && organizer.image) ? organizer.image : 'assets/user.png';
  }
  
  onGlobalFilter(event: Event, dt2: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt2.filterGlobal(inputValue, 'contains');
  }

  onCompetitionClick(competition: any) {
    this.router.navigate(['/comp-details', competition.id]); // Navigate to competition detail
  }
}
