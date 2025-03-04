import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/services/authentication.service';
import {skipUntil} from 'rxjs';
import {CheckboxModule} from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';
import { AuthRequest } from '../../../services/models';
import { AuthStateService } from '../../../services/auth-state.service';
import { HeaderComponent } from "../../../components/shared/header/header.component";
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
    selector: 'app-activate-account',
    imports: [
        CheckboxModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        CommonModule,
        CodeInputModule,
        HeaderComponent,
        FooterComponent
    ],
    templateUrl: './activate-account.component.html',
    styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {

  authRequest: AuthRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  message = '';
  isOkay = true;
  submitted = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private authState: AuthStateService
  ) {}

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        this.submitted = true;
        this.autoLogin();

      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }

  autoLogin() {
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

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  protected readonly skipUntil = skipUntil;
}
