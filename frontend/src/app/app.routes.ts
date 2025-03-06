import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CompComponent } from './pages/view/comp/comp.component';
import { TournamentComponent } from './pages/view/tournament/tournament.component';
import { EventComponent } from './pages/view/event/event.component';
import { ActivateAccountComponent } from './pages/auth/activate-account/activate-account.component';
import { AuthGuard } from './guards/auth.guard';
import { EditCompComponent } from './pages/edit/edit-comp/edit-comp.component';
import { AccountComponent } from './pages/account/account.component';
import { OrganizationComponent } from './pages/view/organization/organization.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'activate-account', component: ActivateAccountComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard]
    },
    { path: 'org/:id', component: OrganizationComponent },
    { path: 'comp/view/:id', component: CompComponent },
    { path: 'tournament/view/:id', component: TournamentComponent },
    { path: 'event/view/:id', component: EventComponent },
    { 
        path: 'comp/edit/:id',
        component: EditCompComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'tournament/edit/:id',
        component: EditCompComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'event/edit/:id',
        component: EditCompComponent,
        canActivate: [AuthGuard]
    },
];
