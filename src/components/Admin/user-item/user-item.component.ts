import { ProjectItemComponent } from './../../Projects/project-item/project-item.component';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TenantService } from '../../../services/tenant.service';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [ToastModule,DialogModule,ProjectItemComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css',
  providers:[]
})
export class UserItemComponent implements OnChanges{
  @Input() user:User={};
  photoUrl:string="assets/default.png";
  visible: boolean = false;
  constructor(
    private _messageService: MessageService,
    private _tenantService:TenantService,
    private _userService:UserService
  ){
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.user.image?.length){
      this.photoUrl = this.user.image;
    }
  }
  deleteUser(userId:string|undefined){
    if(userId && this.user.role == 'user'){
      this._userService.delete(userId).subscribe({
        next:(res)=>{
          console.log(res);
          this._userService.usersList.next(res.data);
          this._messageService.add({ severity: 'info', summary: 'Deleted', detail: 'user deleted successfully' });
        },
        error:(err)=>{
          console.log(err);
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem deleting the user' });
        }
      })
    }else if(userId && this.user.role == 'tenant'){
      this._tenantService.delete(userId).subscribe({
        next:(res)=>{
          this._tenantService.tenantsList.next(res.data);
          this._messageService.add({ severity: 'info', summary: 'Deleted', detail: 'user deleted successfully' });
        },
        error:(err)=>{
          console.log(err);
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem deleting the user' });
        }
      })
    }
  }

  

    showDialog() {
        this.visible = true;
    }
}
