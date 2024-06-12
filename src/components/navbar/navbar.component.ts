import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn:boolean = false;
  constructor(private _authService:AuthenticationService){
    _authService.user.subscribe(res=>{
      if(res?.id){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._authService.user.next({} as User);
  }
}
