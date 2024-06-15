import { Project } from './../../../interfaces/project';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [ReactiveFormsModule,DialogModule,ButtonModule,ToastModule],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css',
  providers:[MessageService]
})
export class ProjectItemComponent implements OnChanges{
  
@Input() project: Project = {} as Project;

  constructor(
    private _messageService: MessageService,
    private _projectService:ProjectService
  ){}

  DeleteDialogvisible: boolean = false;
  UpdateDialogVisible:boolean = false;

  showDeleteDialog() {
        this.DeleteDialogvisible = true;
    }
  showupdateDialog() {
      this.UpdateDialogVisible = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(`constructor ${this.project._id}`);
    this.updateProjectForm.get('name')?.setValue(this.project.name);
    this.updateProjectForm.get('callBackUrl')?.setValue(this.project.callBackUrl);
    
    // console.log(this.project);
    
  }

  updateProjectForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    callBackUrl: new FormControl('',[Validators.required]),
  });

  updateProject(projectID:string|undefined,formGroup: FormGroup){
      if(formGroup.valid && projectID){
        this._projectService.updateProject(projectID,formGroup.value).subscribe({
          next:(res)=>{
            this._projectService.projectsArr.next(res.data);
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'project updated successfully' }); 
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
}
