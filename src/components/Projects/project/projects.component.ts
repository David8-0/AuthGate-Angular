import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from '../../../interfaces/project';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../../services/project.service';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, ProjectItemComponent,DialogModule,ButtonModule,ToastModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers:[MessageService]
})
export class ProjectsComponent implements OnInit{
  projectsArr:Project[] = [];
  constructor(
    private _messageService: MessageService,
    private _projectService: ProjectService
  ){}
  


ngOnInit(): void {
    this._projectService.getAll().subscribe({
      next:(res)=>{
        this.projectsArr=res.data;
      }
    })
    this._projectService.projectsArr.subscribe(newArr=>{
      this.projectsArr=newArr;
    });
}

    

  addProjectForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    callBackUrl: new FormControl('',[Validators.required]),
  });


  addProject(formGroup: FormGroup) {   
    if (formGroup.valid) {
        this._projectService.addProject(formGroup.value).subscribe({
          next:(res)=>{
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'project added successfully' }); 
            this._projectService.projectsArr.next(res.data);
          },
          error:(err)=>{
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was an error adding your project' }); 
          }
        });
    }
  }




}
