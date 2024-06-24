import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CompListComponent } from './pages/comp-list/comp-list.component';
import { MyCompsComponent } from './pages/my-comps/my-comps.component';
import { ManageCompComponent } from './pages/manage-comp/manage-comp.component';
import { authGuard } from '../../services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: CompListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-comps',
        component: MyCompsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage-comps',
        component: ManageCompComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage-comps',
        component: ManageCompComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompRoutingModule { }
