import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserItemComponent } from '../user-item/user-item.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ToastModule,UserItemComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers:[MessageService]
})
export class UsersComponent implements OnInit,OnDestroy{
  users:User[] = [];
  sub:Subscription={} as Subscription;
  constructor(
    private _userService:UserService,
    private _messageService: MessageService
  ){}

  ngOnInit(): void {
      this._userService.getAll().subscribe({
        next:(res)=>{
          this._userService.usersList.next(res.data);
          this.users = res.data;
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
}
