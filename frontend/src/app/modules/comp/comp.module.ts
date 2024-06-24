import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompRoutingModule } from './comp-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { CompListComponent } from './pages/comp-list/comp-list.component';
import { CompCardComponent } from './components/comp-card/comp-card.component';
import { MyCompsComponent } from './pages/my-comps/my-comps.component';
import { ManageCompComponent } from './pages/manage-comp/manage-comp.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    CompCardComponent,
    CompListComponent,
    MyCompsComponent,
    ManageCompComponent
  ],
  imports: [
    CommonModule,
    CompRoutingModule,
    FormsModule
  ]
})
export class CompModule { }
