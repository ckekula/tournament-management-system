import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CompetitionsComponent } from './pages/competitions/competitions.component';
import { CompComponent } from './pages/view/comp/comp.component';
import { TournamentComponent } from './pages/view/tournament/tournament.component';
import { EventComponent } from './pages/view/event/event.component';
import { ActivateAccountComponent } from './pages/auth/activate-account/activate-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EditCompComponent } from './pages/edit/edit-comp/edit-comp.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'activate-account', component: ActivateAccountComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
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
    { path: 'competitions', component: CompetitionsComponent },
    { path: 'comp/:id', component: CompComponent },
    { path: 'tournament/:id', component: TournamentComponent },
    { path: 'event/:id', component: EventComponent }
];
