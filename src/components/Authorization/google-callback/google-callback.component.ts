import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.css'
})
export class GoogleCallbackComponent implements OnInit,OnDestroy{
  token:string|null=null;
  user:any = {};
  sub:Subscription={} as Subscription;
  constructor(
    private _activatedRoute:ActivatedRoute,
    private _autehnticationService:AuthenticationService,
    private _router:Router
  ){

  }

  ngOnInit(): void {
    this.sub =this._activatedRoute.queryParams.subscribe(params => { 
      this.token = params['token'];
      this.user = params['user'];
      this.user = JSON.parse(decodeURIComponent(this.user))
      this._autehnticationService.setUser(this.user,this.token??"");
      this._router.navigateByUrl('/home');
    }); 
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  
}
