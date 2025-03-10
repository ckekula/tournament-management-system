import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { EventTableComponent } from '../../components/activity/event-table/event-table.component';
import { StandingsTableComponent } from '../../components/shared/standings-table/standings-table.component';

@Component({
  selector: 'app-activity',
  imports: [
    HeaderComponent,
    FooterComponent,
    EventTableComponent,
    StandingsTableComponent
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {

}
