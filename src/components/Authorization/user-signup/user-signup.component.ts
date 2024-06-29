import { ValidationService } from './../../../services/validation.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectService } from '../../../services/project.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css',
  providers:[]
})
export class UserSignupComponent {
  isUser: boolean = true;
  isShowPassword:boolean = false;
  isShowConfirmPassword:boolean = false;
  showUserErrors:boolean = false;
  showTenantErrors:boolean = false;
  isProjectID:boolean = false;

  constructor(
    private _messageService: MessageService,
    public _projectService:ProjectService,
    private _authService: AuthenticationService,
    private _router: Router,
    private _validationService:ValidationService
  ){
    if(localStorage.getItem('projectID'))
      this.isProjectID=true;
  }

  registerUserForm = new FormGroup({
    name: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',Validators.pattern(/^(?:\+20|0)?1[0125]\d{8}$/)),
    image: new FormControl(),
    age: new FormControl('',[Validators.min(13),Validators.max(100)]),
    confirmPassword: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
    
  },{validators: this._validationService.passwordMatchValidator('password','confirmPassword')});

  registerTenantForm = new FormGroup({
    name: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',Validators.pattern(/^(?:\+20|0)?1[0125]\d{8}$/)),
    image: new FormControl(),
    address: new FormControl(),
    website: new FormControl('',Validators.pattern(/^www\.[a-zA-Z0-9-]+(\.[a-zA-Z]+)+$/)),
    confirmPassword: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  },{validators: this._validationService.passwordMatchValidator('password','confirmPassword')});

  registerUser(formGroup: FormGroup) {    
    if (formGroup.valid) {
      this._authService.userSingup(formGroup.value).subscribe({
        next:(response) => {
          this._authService.setUser(response.data.user,response.data.access_token);
          if(localStorage.getItem('projectID') && localStorage.getItem('codeChallenge')){
            this._router.navigateByUrl(`/authorize/${localStorage.getItem('projectID')}/${localStorage.getItem('codeChallenge')}`);
          }else{
            this._router.navigateByUrl('/home');
          }
          },
        error: (err) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'something went wrong signing you up' });
        }
      })
    }else{
      this.showUserErrors=true;
    }
  }

  registerTenant(formGroup: FormGroup) {
    if (formGroup.valid) {
      this._authService.tenantSingup (formGroup.value).subscribe({
        next:(response) => {
          this._authService.setUser(response.data.user,response.data.access_token);
          this._router.navigateByUrl('/home');
          },
        error: (err) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'something went wrong signing you up' });
        }
      })
    }else{
      this.showTenantErrors=true;
    }
  }
  toggleShowPassword(){
    this.isShowPassword=!this.isShowPassword;
  }
  toggleShowConfirmPassword(){
    this.isShowConfirmPassword=!this.isShowConfirmPassword;
  }
  signInWithGoogle(){
    window.location.href="http://localhost:3000/auth/google";
  }


  signInWithGitHub(){
    window.location.href="http://localhost:3000/auth/github";
  }

  signInWithFacebook(){
    window.location.href="http://localhost:3000/auth/facebook";
  }
  
}
