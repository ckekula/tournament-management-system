import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompRoutingModule } from './comp-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { CompCardComponent } from './components/comp-card/comp-card.component';

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    CompCardComponent
  ],
  imports: [
    CommonModule,
    CompRoutingModule
  ]
})
export class CompModule { }
