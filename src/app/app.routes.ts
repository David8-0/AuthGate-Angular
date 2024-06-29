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
import { GoogleCallbackComponent } from '../components/Authorization/google-callback/google-callback.component';
import { GithubCallbackComponent } from '../components/Authorization/github-callback/github-callback.component';
import { DeveloperComponent } from '../components/Information/developer/developer.component';
import { isAdminGuard } from '../guards/is-admin.guard';
import { ResetPasswordComponent } from '../components/Authorization/reset-password/reset-password.component';
import { PaypalComponent } from '../components/paypal/paypal.component';
import { PaymobComponent } from '../components/paymob/paymob.component';
import { FacebookCallbackComponent } from '../components/Authorization/facebook-callback/facebook-callback.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'projects', canActivate:[isTenantGuard],component:ProjectsComponent},
    {path:'profile',canActivate:[isLoggedInGuard],component:ProfileComponent},
    {path:'user-signup', component:UserSignupComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'authorize/:projID',component:AuthorizeComponent},
    {path:'error',component:ErrorComponent},
    {path:'dashboard',canActivate:[isAdminGuard], loadChildren: ()=>import('../components/Admin/dashboard/admin.routes').then(m=>m.routes)},
    {path:'auth/google/callback',component:GoogleCallbackComponent},
    {path:'auth/github/callback',component:GithubCallbackComponent},
    {path:'auth/facebook/callback',component:FacebookCallbackComponent},
    {path:'developer',component:DeveloperComponent},
    {path:'reset-password/:token',component:ResetPasswordComponent},
    {path:'paypal/:status',component:PaypalComponent},
    {path:'paymob',component:PaymobComponent},
    {path:'**',component:NotFoundComponent}

];
