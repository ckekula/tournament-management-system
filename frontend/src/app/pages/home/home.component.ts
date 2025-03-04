import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';

@Component({
    selector: 'app-home',
    imports: [
        RippleModule,
        ButtonModule,
        HeaderComponent,
        FooterComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
