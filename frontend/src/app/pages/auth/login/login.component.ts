import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {AuthenticationService} from '../../../services/services/authentication.service';
import {AuthRequest} from '../../../services/models/auth-request';
import {CheckboxModule} from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { AuthStateService } from '../../../services/auth-state.service';
import { HeaderComponent } from "../../../components/shared/header/header.component";
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
    selector: 'app-login',
    imports: [
        CheckboxModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        FormsModule,
        HeaderComponent,
        FooterComponent
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  authRequest: AuthRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private authState: AuthStateService
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.authState.setAuthState(res);
        this.router.navigate(['/new-profile']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
