import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from './models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private authToken = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private currentUser = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || 'null'));

  constructor() {}

  setAuthState(response: AuthResponse) {
    if (response.token) {
      localStorage.setItem('token', response.token);
      this.authToken.next(response.token);
      
      // Store user info from token
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authToken.next(null);
    this.currentUser.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.authToken.value;
  }

  getToken(): string | null {
    return this.authToken.value;
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
}