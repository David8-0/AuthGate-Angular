import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:User = {} as User;
  isEditMode: boolean = false;
  
  constructor(
    private _authService:AuthenticationService
  ){
    _authService.user.subscribe((newUser) =>{
      this.user = newUser;
     
      
    });
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode; // Toggle the value of isEditMode
  }
}
