import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:User = {} as User;
  constructor(
    private _authService:AuthenticationService
  ){
    _authService.user.subscribe((newUser) =>{
      this.user = newUser;
      console.log(this.user);
      
    });
  }

}
