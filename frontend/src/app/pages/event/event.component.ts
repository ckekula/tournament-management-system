import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { StandingsTableComponent } from '../../components/shared/standings-table/standings-table.component';
import { StageTabsComponent } from "../../components/event/stage-tabs/stage-tabs.component";

@Component({
  selector: 'app-event',
  imports: [
    HeaderComponent,
    FooterComponent,
    StandingsTableComponent,
    StageTabsComponent
],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

}
