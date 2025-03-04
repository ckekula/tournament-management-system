import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/services/authentication.service';
import {RegistrationRequest} from '../../../services/models/registration-request';
import {CheckboxModule} from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../components/shared/header/header.component";
import { FooterComponent } from "../../../components/shared/footer/footer.component";

@Component({
    selector: 'app-register',
    imports: [
        CheckboxModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        FormsModule,
        HeaderComponent,
        FooterComponent
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
  }
}
