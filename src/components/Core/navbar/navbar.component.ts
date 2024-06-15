import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLoggedIn:boolean = false;
  user:User={} as User;
  constructor(
    private _authService:AuthenticationService,
    private _router:Router
  ){}

  ngOnInit(): void {
    this._authService.user.subscribe(res=>{
      if(res?.id){
        this.isLoggedIn = true;
        this.user = res;
      }else{
        this.isLoggedIn = false;
      }
    });
  }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._authService.user.next({} as User);
    this._router.navigateByUrl('/home');
  }
}
