import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthStateService } from '../../../services/auth-state.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    imports: [
        ButtonModule,
        RippleModule,
        CommonModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private authState: AuthStateService
  ) {}

  ngOnInit() {
    this.authState.getCurrentUser().subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  
  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    this.authState.clearAuthState();
    this.router.navigate(['/']);
  }
}