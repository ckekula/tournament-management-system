import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../../components/account/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from '../../components/account/organizations/organizations.component';

@Component({
    selector: 'app-account',
    imports: [
      CommonModule,
      HeaderComponent,
      FooterComponent,
      ButtonModule,
      RippleModule,
      OrganizationsComponent
],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {

    sidebarVisible: boolean = false;
    NewOrgVisible: boolean = false;

    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }

    toggleNewOrg() {
      this.NewOrgVisible = !this.NewOrgVisible;
    }
}
