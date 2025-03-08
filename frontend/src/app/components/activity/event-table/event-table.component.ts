import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { _Event } from '../../../types/models';
import { AddActivityComponent } from '../../tournament/add-activity/add-activity.component';

@Component({
  selector: 'app-event-table',
  imports: [
    TableModule, 
    TagModule, 
    IconFieldModule, 
    InputTextModule, 
    InputIconModule, 
    MultiSelectModule, 
    SelectModule, 
    CommonModule,
    AddActivityComponent
  ],
  templateUrl: './event-table.component.html',
  styleUrl: './event-table.component.scss'
})
export class EventTableComponent {

  events: _Event [] = [
    { id: 1, name: 'Mens Basketball', category: 'Men' },
    { id: 2, name: 'Womens Basketball', category: 'Women' },
  ]

  selectedEvent!: _Event;

  loading: boolean = false; //set to true later

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  newEventVisible = false;

  onGlobalFilter(event: Event, dt2: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt2.filterGlobal(inputValue, 'contains');
  }

  navigateToEvent(event: any) {
    const tournSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (tournSlug) {
      this.router.navigate([tournSlug, event.id]);
    }
  }

  toggleNewEvent(): void {
    this.newEventVisible = true;
  }

  addActivity(event: _Event): void {
    this.events = [...this.events, event];
  }
}
