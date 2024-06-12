import { Routes } from '@angular/router';
import { UserSignupComponent } from '../components/user-signup/user-signup.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    {path:'user-signup', component:UserSignupComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent}
];
