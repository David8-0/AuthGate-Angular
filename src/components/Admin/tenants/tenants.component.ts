import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserItemComponent } from '../user-item/user-item.component';
import { Subscription } from 'rxjs';
import { TenantService } from '../../../services/tenant.service';
import { SearchUsersPipe } from '../../../pipes/search-users.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationPipe } from '../../../pipes/pagination.pipe';
import { TimesPipe } from '../../../pipes/times.pipe';
import { DeleteFilterPipe } from '../../../pipes/delete-filter.pipe';
@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [ToastModule,UserItemComponent,SearchUsersPipe,FormsModule,PaginationPipe,TimesPipe,DeleteFilterPipe],
  templateUrl: './tenants.component.html',
  styleUrl: './tenants.component.css',
  providers:[MessageService]
})
export class TenantsComponent {
  tenants:User[] = [];
  searchKey:string="";
  sub:Subscription={} as Subscription;
  numberOfPages:number=0;
  pageSize:number=4;
  cureentPage:number=1;
  deleteValue:string="all";
  constructor(
    private _tenantService:TenantService,
    private _messageService: MessageService
  ){}

  ngOnInit(): void {
      this._tenantService.getAll().subscribe({
        next:(res)=>{
          this._tenantService.tenantsList.next(res.data);
          this.tenants = res.data;
          this.numberOfPages=Math.ceil(this.tenants.length /this.pageSize);
        },
        error:(err)=>{
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an Error getting users' });
        }
      });
    this.sub = this._tenantService.tenantsList.subscribe((newList)=>{
      this.tenants=newList;
    });
  }
  
  setDeleteFilter(value:string){
    this.deleteValue = value;
  }

  jumpToPage(page: number) {
    this.cureentPage = page; 
  }

ngOnDestroy(): void {
    this.sub.unsubscribe();
}
}
