import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit,OnDestroy{
  isLoggedIn:boolean = false;
  isFixedNavbar:boolean = false;
  user:User={} as User;
  subscriptions:Subscription[]=[];


  constructor(
    private _authService:AuthenticationService,
    private _router:Router
  ){}

  @HostListener('document:scroll', ['$event'])
  scrollEvent(){
    if(document.documentElement.scrollTop>0){
      this.isFixedNavbar=true;
    }else{
      this.isFixedNavbar=false;
    }
  }

  ngOnInit(): void {
    const sub =this._authService.user.subscribe(res=>{
      if(res?._id){
        this.isLoggedIn = true;
        this.user = res;
      }else{
        this.isLoggedIn = false;
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
  logOut(){
    this._authService.logOut();
    this._router.navigateByUrl('/home');
  }
}
