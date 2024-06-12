import { Routes } from '@angular/router';
import { UserSignupComponent } from '../components/user-signup/user-signup.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { AuthorizeComponent } from '../components/authorize/authorize.component';
import { isLoggedInGuard } from '../guards/is-logged-in.guard';
import { ProfileComponent } from '../components/profile/profile.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'profile',component:ProfileComponent},
    {path:'authorize/:id',component:AuthorizeComponent},
    {path:'user-signup', component:UserSignupComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent}
];
