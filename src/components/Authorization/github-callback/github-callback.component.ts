import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../../services/project.service';
import { MessageService } from 'primeng/api';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-github-callback',
  standalone: true,
  imports: [],
  templateUrl: './github-callback.component.html',
  styleUrl: './github-callback.component.css'
})
export class GithubCallbackComponent implements OnInit,OnDestroy{
  token:string|null=null;
  user:User = {};
  sub:Subscription={} as Subscription;
  constructor(
    private _messageService: MessageService,
    public _projectService:ProjectService,
    private _activatedRoute:ActivatedRoute,
    private _autehnticationService:AuthenticationService,
    private _router:Router
  ){

  }

  ngOnInit(): void {
    this.sub =this._activatedRoute.queryParams.subscribe(params => { 
      this.token = params['token'];
      this.user = JSON.parse(decodeURIComponent(params['user']));
      this._autehnticationService.setUser(this.user,this.token??"");
      console.log(this.user);
      
      if(this.user.isFirstTime){
        this._messageService.add({ severity: 'info', summary: 'Info', detail: 'unfortunately github does not provide email so we have generated random email for you and you can change it any time you want!' });
      }
      if(localStorage.getItem('projectID') && localStorage.getItem('codeChallenge')){
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
