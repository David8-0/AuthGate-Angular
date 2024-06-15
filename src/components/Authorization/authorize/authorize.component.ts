import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../interfaces/project';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-authorize',
  standalone: true,
  imports: [],
  templateUrl: './authorize.component.html',
  styleUrl: './authorize.component.css'
})
export class AuthorizeComponent implements OnInit{
  projectID:string|null=null;
  project:Project = {} as Project;
  user:User = {} as User;
  constructor(
    private _authenticationService:AuthenticationService,
    private _projectService:ProjectService,
    private _activatedRoute:ActivatedRoute,
    private _router:Router
  ){}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => { 
      this.projectID = params.get('projID');
    });

    if(!this._authenticationService.user.value.id){
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
            this._router.navigateByUrl('/error');
          }
        })
      }
      this._authenticationService.user.subscribe(newUser=>{
        this.user=newUser;
      })
    }
  }

  confirm(){}
  cancel(){
    this._router.navigateByUrl('/home');
  }
}
