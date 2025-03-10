import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Organization } from '../../../types/models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddOrgComponent } from '../add-org/add-org.component';
import { OrgCardComponent } from '../org-card/org-card.component';

@Component({
  selector: 'app-org-list',
  imports: [
    CommonModule,
    ButtonModule,
    AddOrgComponent,
    OrgCardComponent
  ],
  templateUrl: './org-list.component.html',
  styleUrl: './org-list.component.scss'
})
export class OrgListComponent {

  constructor(
    private router: Router,
  ) {}

  organizations = [
    { id: 1, name: 'Nature Co', abbreviation: 'NC' },
    { id: 2, name: 'Innovate Ltd', abbreviation: 'INNO' },
    { id: 3, name: 'Tech Corp', abbreviation: 'TC' },
  ];

  newOrgVisible = false;

  toggleNewOrg(): void {
    this.newOrgVisible = true;
  }

  addOrganization(org: Organization): void {
    this.organizations = [...this.organizations, org];
  }

  navigateToOrg(orgAbb: string, orgId: number): void {
    this.router.navigate(['/org', orgAbb, orgId]);
  }
}
