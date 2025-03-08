import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { TopThreeComponent } from "../../components/shared/top-three/top-three.component";
import { EventTableComponent } from '../../components/activity/event-table/event-table.component';

@Component({
  selector: 'app-activity',
  imports: [
    HeaderComponent,
    FooterComponent,
    TopThreeComponent,
    EventTableComponent
],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {

}
