import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './new-profile.component.html',
  styleUrl: './new-profile.component.scss'
})
export class NewProfileComponent {
  constructor(private router: Router) {}

  navigateToNewOrg() {
    this.router.navigate(['/new-organization']);
  }
}

