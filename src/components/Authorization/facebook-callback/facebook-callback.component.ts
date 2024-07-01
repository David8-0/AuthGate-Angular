import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-facebook-callback',
  standalone: true,
  imports: [],
  templateUrl: './facebook-callback.component.html',
  styleUrl: './facebook-callback.component.css'
})
export class FacebookCallbackComponent {
  token:string|null=null;
  user:any = {};
  sub:Subscription={} as Subscription;
  constructor(
    public _projectService:ProjectService,
    private _activatedRoute:ActivatedRoute,
    private _autehnticationService:AuthenticationService,
    private _router:Router
  ){}

  ngOnInit(): void {
    this.sub =this._activatedRoute.queryParams.subscribe(params => { 
      this.token = params['token'];
      this.user = params['user'];
      this.user = JSON.parse(decodeURIComponent(this.user));
 
      
      
      this._autehnticationService.setUser(this.user,this.token??"");
      if(localStorage.getItem('projectID')&& localStorage.getItem('codeChallenge')){
        this._router.navigateByUrl(`/authorize/${localStorage.getItem('projectID')}/${localStorage.getItem('codeChallenge')}`);
      }else{
        this._router.navigateByUrl('/home');
      }
    }); 
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
