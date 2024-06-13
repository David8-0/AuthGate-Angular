import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Project } from '../../../interfaces/project';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent implements OnChanges{
  
@Input() project: Project = {} as Project;

  constructor(){
     
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateProjectForm.get('name')?.setValue(this.project.name);
    this.updateProjectForm.get('callBackUrl')?.setValue(this.project.callBackUrl);
  }


  updateProjectForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    callBackUrl: new FormControl('',[Validators.required]),
  });

  updateProject(formGroup: FormGroup){
    if(formGroup.valid){

    }
  }


  deleteProject(projectID:string|undefined){
    
  }
}
