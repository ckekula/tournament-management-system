import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { CompetitionsComponent } from './pages/competitions/competitions.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'competitions',
        component: CompetitionsComponent
    },
];
