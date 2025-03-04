import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { GroupComponent } from './group/group.component';

@Component({
    selector: 'app-group-stage',
    imports: [
        TableModule,
        IconFieldModule,
        InputTextModule,
        InputIconModule,
        CommonModule,
        TabViewModule,
        CommonModule,
        ScrollPanelModule,
        GroupComponent
    ],
    templateUrl: './group-stage.component.html',
    styleUrl: './group-stage.component.scss'
})
export class GroupStageComponent {

  @Input() eventId!: string;

  loading: boolean = true;
  event!: any;
  groups!: any[];

  ngOnInit() {
    this.loading = true;
  
    if (this.eventId) {

    } else {
      console.error('Event not found!');
    }
    
    this.loading = false;
  }

}
