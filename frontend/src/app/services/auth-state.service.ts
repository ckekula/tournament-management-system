import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from './models/auth-response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private authToken = new BehaviorSubject<string | null>(null);
  private currentUser = new BehaviorSubject<any>(null);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      this.authToken.next(token);
      this.currentUser.next(user ? JSON.parse(user) : null);
    }
  }

  setAuthState(response: AuthResponse) {
    if (!this.isBrowser) return; // Prevent execution on the server

    if (response.token) {
      localStorage.setItem('token', response.token);
      this.authToken.next(response.token);
      
      // Decode token payload
      const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
      const user = {
        email: tokenPayload.sub,
        fullName: tokenPayload.fullName
      };

      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser.next(user);
    }
  }

  clearAuthState() {
    if (!this.isBrowser) return; // Prevent execution on the server

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authToken.next(null);
    this.currentUser.next(null);
  }

  isAuthenticated(): boolean {
    return this.authToken.value !== null;
  }

  getToken(): string | null {
    return this.authToken.value;
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
}
