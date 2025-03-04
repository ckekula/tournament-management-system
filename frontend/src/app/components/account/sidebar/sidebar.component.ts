import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
    selector: 'app-sidebar',
    imports: [
      DrawerModule,
      ButtonModule
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() visible: boolean = false;

  closeCallback(event: Event) {
    this.visible = false;
  }
}
