import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stage-tabs',
  imports: [
    CommonModule, 
    TabsModule
  ],
  templateUrl: './stage-tabs.component.html',
  styleUrl: './stage-tabs.component.scss'
})
export class StageTabsComponent {
  tabs: { title: string; value: number; content: string }[] = [];

  ngOnInit() {
      this.tabs = [
          { title: 'Tab 1', value: 0, content: 'Tab 1 Content' },
          { title: 'Tab 2', value: 1, content: 'Tab 2 Content' },
          { title: 'Tab 3', value: 2, content: 'Tab 3 Content' },
      ];
  }
}
