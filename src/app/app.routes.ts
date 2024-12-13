import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SportEventsPageComponent } from './sport-events/pages/sport-events-page/sport-events-page.component';
import { BetHistoryComponent } from './bet-history/page/bet-history/bet-history.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'events',
    component: SportEventsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bet-history',
    component: BetHistoryComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: '**',
    redirectTo: '/login', 
  },
];
