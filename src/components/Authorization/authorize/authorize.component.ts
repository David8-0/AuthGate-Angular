import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../interfaces/project';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authorize',
  standalone: true,
  imports: [],
  templateUrl: './authorize.component.html',
  styleUrl: './authorize.component.css'
})
export class AuthorizeComponent implements OnInit,OnDestroy{
  projectID:string|null=null;
  codeChallenge:string|null=null;
  project:Project = {} as Project;
  user:User = {} as User;
  subscriptions:Subscription[]=[];
  
  constructor(
    private _messageService: MessageService,
    private _userService:UserService,
    private _authenticationService:AuthenticationService,
    private _projectService:ProjectService,
    private _activatedRoute:ActivatedRoute,
    private _router:Router
  ){
  }

  ngOnInit(): void {
    const sub =this._activatedRoute.paramMap.subscribe(params => { 
      this.projectID = params.get('projID');
      this.codeChallenge = params.get('codeChallenge');
    });
    this.subscriptions.push(sub);
    
    if(!localStorage.getItem('token')){
      localStorage.setItem('projectID',`${this.projectID}`)
      localStorage.setItem('codeChallenge',`${this.codeChallenge}`)
      this._router.navigateByUrl('/login');
    }else{
      localStorage.removeItem('codeChallenge');
      localStorage.removeItem('projectID');
      if(this.projectID){
        this._projectService.getByID(this.projectID).subscribe({
          next:(res)=>{
            this.project=res.data;
          },
          error:(err)=>{
            this._messageService.add({ severity: 'error', summary: 'Error', detail: `there was a problem subscriping to this project` });
            this._router.navigateByUrl('/error');
          }
        })
      }
      this._authenticationService.user.subscribe(newUser=>{
        this.user=newUser;
      })
    }
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  confirm(){
    if(this.projectID && this.codeChallenge){
      this._userService.addUserToProject(this.projectID,this.codeChallenge).subscribe({
        next:(res)=>{
          
          window.location.href=`http://${this.project.callBackUrl}/${res.data.result.authorizationCode}`
        },
        error:(err)=>{
          
        }
      });
    }
  }
  cancel(){
    this._router.navigateByUrl('/home');
  }
}
