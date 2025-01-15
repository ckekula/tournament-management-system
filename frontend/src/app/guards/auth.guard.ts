import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authState: AuthStateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authState.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}