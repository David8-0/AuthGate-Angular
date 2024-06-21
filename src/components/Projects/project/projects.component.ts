import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from '../../../interfaces/project';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../../services/project.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, ProjectItemComponent,DialogModule,ButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers:[]
})
export class ProjectsComponent implements OnInit,OnDestroy{
  projectsArr:Project[] = [];
  subscriptions:Subscription[] = [];
  constructor(
    private _messageService: MessageService,
    private _projectService: ProjectService
  ){}
  


ngOnInit(): void {
    this._projectService.getAllPerTenant().subscribe({
      next:(res)=>{
        this.projectsArr=res.data;
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    const sub =this._projectService.projectsArr.subscribe(newArr=>{
      this.projectsArr=newArr;
    });
    this.subscriptions.push(sub); 
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
            this.addProjectForm.get('name')?.reset();
            this.addProjectForm.get('callBackUrl')?.reset();
          },
          error:(err)=>{
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was an error adding your project' }); 
          }
        });
    }
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe());
  }


}
