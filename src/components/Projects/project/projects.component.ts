import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from '../../../interfaces/project';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, ProjectItemComponent,DialogModule,ButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
proj:Project = {
  clientID:"asdasdasd",
    clientSECRET:"secreeet4dasd",
    name:"Talabat",
    callBackUrl: "TalabatURL"
}



    

  addProjectForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    callBackUrl: new FormControl('',[Validators.required]),
  });


  addProject(formGroup: FormGroup) {    
    if (formGroup.valid) {
      // this._authService.logIn(formGroup.value).subscribe({
      //   next:(response) => {
      //     this._authService.setUser(response.user,response.access_token);
      //     this._router.navigateByUrl('/home');
      //     },
      //   error: (err) => {
      //     console.log(err);
      //   }
      // })
    }
  }




}
