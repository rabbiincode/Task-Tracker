import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', title: 'Tasks', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent }
]
