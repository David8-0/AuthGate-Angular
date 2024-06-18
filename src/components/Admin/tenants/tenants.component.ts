import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserItemComponent } from '../user-item/user-item.component';
import { Subscription } from 'rxjs';
import { TenantService } from '../../../services/tenant.service';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [ToastModule,UserItemComponent],
  templateUrl: './tenants.component.html',
  styleUrl: './tenants.component.css',
  providers:[MessageService]
})
export class TenantsComponent {
  tenants:User[] = [];
  sub:Subscription={} as Subscription;
  constructor(
    private _tenantService:TenantService,
    private _messageService: MessageService
  ){}

  ngOnInit(): void {
      this._tenantService.getAll().subscribe({
        next:(res)=>{
          this._tenantService.tenantsList.next(res.data);
          this.tenants = res.data;
        },
        error:(err)=>{
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an Error getting users' });
        }
      });
    this.sub = this._tenantService.tenantsList.subscribe((newList)=>{
      this.tenants=newList;
    });
  }

ngOnDestroy(): void {
    this.sub.unsubscribe();
}
}
