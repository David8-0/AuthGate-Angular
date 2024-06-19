import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectService } from '../../../services/project.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[MessageService]
})
export class LoginComponent {
  isShowPassword:boolean = false;
  showErrors:boolean = false;
  constructor(
    private _messageService: MessageService,
    private _authService: AuthenticationService,
    public _projectService:ProjectService,
    private _router: Router
  ){}

 

  loginForm = new FormGroup({
    password: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.email]),
  });

  register(formGroup: FormGroup) {    
    if (formGroup.valid) {
      this._authService.logIn(formGroup.value).subscribe({
        next:(response) => {
          this._authService.setUser(response.data.user,response.data.access_token);
          if(this._projectService.projectID){
            this._router.navigateByUrl(`/authorize/${this._projectService.projectID}`);
          }else{
            this._router.navigateByUrl('/home');
          }
          },
        error: (err) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'your email or password is invalid' });
        }
      })
    }else{
      this.showErrors=true;
    }
  }

  toggleShowPassword(){
    this.isShowPassword=!this.isShowPassword;
  }

  signInWithGoogle(){
    window.location.href="http://localhost:3000/auth/google";
  }


  signInWithGitHub(){
    window.location.href="http://localhost:3000/auth/github";
  }
}
