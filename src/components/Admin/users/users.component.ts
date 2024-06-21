import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';
import { UserItemComponent } from '../user-item/user-item.component';
import { Subscription } from 'rxjs';
import { SearchUsersPipe } from '../../../pipes/search-users.pipe';
import { FormsModule } from '@angular/forms';
import { PaginationPipe } from '../../../pipes/pagination.pipe';
import { TimesPipe } from '../../../pipes/times.pipe';
import { DeleteFilterPipe } from '../../../pipes/delete-filter.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserItemComponent,SearchUsersPipe,FormsModule,PaginationPipe,TimesPipe,DeleteFilterPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers:[]
})
export class UsersComponent implements OnInit,OnDestroy{
  users:User[] = [];
  searchKey:string="";
  sub:Subscription={} as Subscription;
  numberOfPages:number=0;
  pageSize:number=8;
  cureentPage:number=1;

  deleteValue:string="all";

  constructor(
    private _userService:UserService,
    private _messageService: MessageService
  ){}

  ngOnInit(): void {
      this._userService.getAll().subscribe({
        next:(res)=>{
          this._userService.usersList.next(res.data);
          this.users = res.data;
          this.numberOfPages=Math.ceil(this.users.length /this.pageSize);
        },
        error:(err)=>{
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an Error getting users' });
        }
      });
    this.sub = this._userService.usersList.subscribe((newList)=>{
      this.users=newList;
    });
  }

ngOnDestroy(): void {
    this.sub.unsubscribe();
}

setDeleteFilter(value:string){
  this.deleteValue = value;
}

jumpToPage(page: number) {
  this.cureentPage = page; 
}
}
