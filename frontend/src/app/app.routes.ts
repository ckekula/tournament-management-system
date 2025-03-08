import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ActivateAccountComponent } from './pages/auth/activate-account/activate-account.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { TournamentComponent } from './pages/tournament/tournament.component';
import { ActivityComponent } from './pages/activity/activity.component';

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
    { path: 'tourna/:id', component: TournamentComponent },
    { path: ':tournId/act/:id', component: ActivityComponent}
];
