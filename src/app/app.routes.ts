import { Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { AuthorizeComponent } from '../components/Authorization/authorize/authorize.component';
import { isLoggedInGuard } from '../guards/is-logged-in.guard';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProjectsComponent } from '../components/Projects/project/projects.component';
import { UserSignupComponent } from '../components/Authorization/user-signup/user-signup.component';
import { LoginComponent } from '../components/Authorization/login/login.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'projects',component:ProjectsComponent},
    {path:'profile',component:ProfileComponent},
    {path:'authorize/:id',component:AuthorizeComponent},
    {path:'user-signup', component:UserSignupComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent}
];
