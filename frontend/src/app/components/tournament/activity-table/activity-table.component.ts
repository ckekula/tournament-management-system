import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../../types/models';
import { AddActivityComponent } from '../add-activity/add-activity.component';

@Component({
  selector: 'app-activity-table',
  imports: [TableModule, 
    TagModule, 
    IconFieldModule, 
    InputTextModule, 
    InputIconModule, 
    MultiSelectModule, 
    SelectModule, 
    CommonModule,
    AddActivityComponent
  ],
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {

  activities: Activity [] = [
    { id: 1, name: 'Basketball' },
    { id: 2, name: 'Cricket' },
  ]

  selectedActivity!: Activity;

  loading: boolean = false; //set to true later

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  newActivityVisible = false;

  onGlobalFilter(event: Event, dt2: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt2.filterGlobal(inputValue, 'contains');
  }

  navigateToActivity(activity: any) {
    const tournId = this.activatedRoute.snapshot.paramMap.get('id');
    if (tournId) {
      this.router.navigate([tournId, 'act', activity.id]);
    }
  }

  toggleNewActivity(): void {
    this.newActivityVisible = true;
  }

  addActivity(activity: Activity): void {
    this.activities = [...this.activities, activity];
  }
}
