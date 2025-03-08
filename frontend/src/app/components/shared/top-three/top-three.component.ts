import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-three',
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './top-three.component.html',
  styleUrl: './top-three.component.scss'
})
export class TopThreeComponent {
  faTrophy = faTrophy;
}
