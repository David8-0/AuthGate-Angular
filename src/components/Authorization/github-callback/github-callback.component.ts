import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../../services/project.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-github-callback',
  standalone: true,
  imports: [],
  templateUrl: './github-callback.component.html',
  styleUrl: './github-callback.component.css'
})
export class GithubCallbackComponent implements OnInit,OnDestroy{
  token:string|null=null;
  user:any = {};
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
      this.user = params['user'];
      this.user = JSON.parse(decodeURIComponent(this.user));
      this._autehnticationService.setUser(this.user,this.token??"");
      this._messageService.add({ severity: 'info', summary: 'Info', detail: 'unfortunately github does not provide email so we have generated random email for you and you can change it any time you want!' });
      if(localStorage.getItem('projectID')){
        this._router.navigateByUrl(`/authorize/${localStorage.getItem('projectID')}`);
      }else{
        this._router.navigateByUrl('/home');
      }
    }); 
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
