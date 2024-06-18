import { Routes, CanActivateFn } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from '../users/users.component';
import { TenantsComponent } from '../tenants/tenants.component';

export const routes: Routes = [
    {path:'',component:DashboardComponent,children:[
        {path:'users',component:UsersComponent},
        {path:'tenants',component:TenantsComponent},
    ]},
    

];