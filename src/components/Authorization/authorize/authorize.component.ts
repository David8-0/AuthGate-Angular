import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../interfaces/project';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authorize',
  standalone: true,
  imports: [],
  templateUrl: './authorize.component.html',
  styleUrl: './authorize.component.css'
})
export class AuthorizeComponent implements OnInit,OnDestroy{
  projectID:string|null=null;
  project:Project = {} as Project;
  user:User = {} as User;
  subscriptions:Subscription[]=[];
  constructor(
    private _userService:UserService,
    private _authenticationService:AuthenticationService,
    private _projectService:ProjectService,
    private _activatedRoute:ActivatedRoute,
    private _router:Router
  ){
    //console.log(this._authenticationService.user.value);

  }

  ngOnInit(): void {
    const sub =this._activatedRoute.paramMap.subscribe(params => { 
      this.projectID = params.get('projID');
    });
    this.subscriptions.push(sub);
    //console.log(this._authenticationService.user.value);
    
    if(!localStorage.getItem('token')){
      this._projectService.projectID = this.projectID;
      this._router.navigateByUrl('/login');
    }else{
      this._projectService.projectID=null;
      if(this.projectID){
        this._projectService.getByID(this.projectID).subscribe({
          next:(res)=>{
            this.project=res.data;
          },
          error:(err)=>{
            console.log(err);
            
            //this._router.navigateByUrl('/error');
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
    if(this.projectID){
      this._userService.addUserToProject(this.projectID).subscribe({
        next:(res)=>{
          console.log(res);
          window.location.href=`https://${this.project.callBackUrl}/${res.data.result.authorizationCode}`
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }
  cancel(){
    this._router.navigateByUrl('/home');
  }
}
