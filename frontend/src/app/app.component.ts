import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StyleClassModule} from 'primeng/styleclass';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        StyleClassModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
