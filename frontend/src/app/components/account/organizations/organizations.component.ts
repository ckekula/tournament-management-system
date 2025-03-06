import { Component } from '@angular/core';
import { NewOrgComponent } from '../new-org/new-org.component';
import { ButtonModule } from 'primeng/button';
import { Organization } from '../../../types/models';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-organizations',
  imports: [
    CommonModule,
    ButtonModule,
    NewOrgComponent,
    CardModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export class OrganizationsComponent {
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

  viewOrganization(org: Organization): void {
    this.router.navigate(['/org', org.id]);
  }

}
