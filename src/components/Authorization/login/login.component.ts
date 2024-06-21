import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectService } from '../../../services/project.service';
import { DialogModule } from 'primeng/dialog';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DialogModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[]
})
export class LoginComponent {
  isShowPassword:boolean = false;
  showErrors:boolean = false;
  showResetPasswordDialog: boolean = false;
  showResetPasswordErrors:boolean = false;
  constructor(
    private _messageService: MessageService,
    private _authService: AuthenticationService,
    public _projectService:ProjectService,
    private _router: Router
  ){}

 

  loginForm = new FormGroup({
    password: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
  });

  resetPasswordForm = new FormGroup({
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

  resetPassword(formGroup: FormGroup){
    if(formGroup.valid){
      this._authService.resetPassword(formGroup.value).subscribe({
        next:(res)=>{
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'an email has been sent to you ' });
          this.showResetPasswordDialog=false;
          console.log(res);
        },
        error:(err)=>{
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there is a problem with your email' });
          console.log(err);
        }
      });
    }else{
      this.showResetPasswordErrors=true;
    }
  }
}
