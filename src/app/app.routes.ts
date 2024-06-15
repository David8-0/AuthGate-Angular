import { Routes, CanActivateFn } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { AuthorizeComponent } from '../components/Authorization/authorize/authorize.component';
import { isLoggedInGuard } from '../guards/is-logged-in.guard';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProjectsComponent } from '../components/Projects/project/projects.component';
import { UserSignupComponent } from '../components/Authorization/user-signup/user-signup.component';
import { LoginComponent } from '../components/Authorization/login/login.component';
import { isTenantGuard } from '../guards/is-tenant.guard';
import { NotFoundComponent } from '../components/Core/not-found/not-found.component';
import { ErrorComponent } from '../components/Core/error/error.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'projects', canActivate:[isTenantGuard],component:ProjectsComponent},
    {path:'profile',canActivate:[isLoggedInGuard],component:ProfileComponent},
    {path:'user-signup', component:UserSignupComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'authorize/:projID',component:AuthorizeComponent},
    {path:'error',component:ErrorComponent},
    {path:'**',component:NotFoundComponent}
];
