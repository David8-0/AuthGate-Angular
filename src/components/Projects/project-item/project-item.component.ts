import { Project } from './../../../interfaces/project';
import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { User } from '../../../interfaces/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectService } from '../../../services/project.service';
@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [ReactiveFormsModule,DialogModule,ButtonModule],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css',
  providers:[]
})
export class ProjectItemComponent implements OnChanges,OnInit,OnDestroy{
  
@Input() project: Project = {} as Project;
sub:Subscription={} as Subscription;
user:User = {};
  constructor(
    private _authenticationService: AuthenticationService,
    private _messageService: MessageService,
    private _projectService:ProjectService
  ){
    
  }
  showClientSecret:boolean = false;
  DeleteDialogvisible: boolean = false;
  UpdateDialogVisible:boolean = false;

  showDeleteDialog() {
        this.DeleteDialogvisible = true;
        
    }
  showupdateDialog() {
      this.UpdateDialogVisible = true;
      
  }
  ngOnInit(): void {
    this.sub = this._authenticationService.user.subscribe(
      (newUser)=>{
        this.user=newUser;
      }
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateProjectForm.get('name')?.setValue(this.project.name);
    this.updateProjectForm.get('callBackUrl')?.setValue(this.project.callBackUrl);
  }

  updateProjectForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    callBackUrl: new FormControl('',[Validators.required]),
  });

  updateProject(projectID:string|undefined,formGroup: FormGroup){
      if(formGroup.valid && projectID){
        this._projectService.updateProject(projectID,formGroup.value).subscribe({
          next:(res)=>{
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'project updated successfully' }); 
            this._projectService.projectsArr.next(res.data);
            
          },error:(err)=>{
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was an error updating your project' });
          },complete:()=>{
            this.UpdateDialogVisible=false;
          }
        });
      }
  }

  deleteProject(projectID:string | undefined){
    if(projectID){
      this._projectService.deleteProject(projectID).subscribe({
        next:(res)=>{
          this._messageService.add({ severity: 'info', summary: 'Info', detail: 'successfully deleted your project' });
          this._projectService.projectsArr.next(res.data);
        },
        error:(err)=>{
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was an error deleting your project' });
        },complete:()=>{this.DeleteDialogvisible=false;}
      });
    }

  }

  copyClientSecret(){
    if(this.project.clientSECRET){
      navigator.clipboard.writeText(this.project.clientSECRET).then(()=>{console.log("copied")}).catch(err=>{console.log(err)});
    }
  }

  copyClientID(){
    if(this.project.clientID){
      navigator.clipboard.writeText(this.project.clientID).then(()=>{console.log("copied")}).catch(err=>{console.log(err)});
    }
  }

  toggleShowClientSecret(){
    this.showClientSecret = !this.showClientSecret;
  }
}

