import { Component } from '@angular/core';
import { NewOrgComponent } from '../new-org/new-org.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Organization } from '../../../types/account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizations',
  imports: [
    CommonModule, 
    ButtonModule, 
    TableModule, 
    NewOrgComponent
  ],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export class OrganizationsComponent {
  organizations = [
    { id: 1, name: 'Tech Corp', abbreviation: 'TC' },
    { id: 2, name: 'Innovate Ltd', abbreviation: 'INNO' },
  ];

  newOrgVisible = false;

  toggleNewOrg(): void {
    this.newOrgVisible = true;
  }

  addOrganization(org: Organization): void {
    this.organizations = [...this.organizations, org];
  }

}
