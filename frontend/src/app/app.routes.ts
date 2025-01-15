import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CompetitionsComponent } from './pages/competitions/competitions.component';
import { CompDetailsComponent } from './pages/comp-details/comp-details.component';
import { TournamentComponent } from './pages/tournament/tournament.component';
import { EventComponent } from './pages/event/event.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'competitions', component: CompetitionsComponent },
    { path: 'comp-details/:id', component: CompDetailsComponent },
    { path: 'tournament/:id', component: TournamentComponent },
    { path: 'event/:id', component: EventComponent }
];
