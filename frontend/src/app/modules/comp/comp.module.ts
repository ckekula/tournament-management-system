import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompRoutingModule } from './comp-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    CompRoutingModule
  ]
})
export class CompModule { }
