import { Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { WelcomeComponent } from './welcome.component';

export const WELCOME_ROUTES: Routes = [
  { path: '', component: WelcomeComponent },
];
