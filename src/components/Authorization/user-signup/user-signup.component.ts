import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectService } from '../../../services/project.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive,ToastModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css',
  providers:[MessageService]
})
export class UserSignupComponent {
  isUser: boolean = true;
  isShowPassword:boolean = false;
  isShowConfirmPassword:boolean = false;
  showUserErrors:boolean = false;
  showTenantErrors:boolean = false;
  constructor(
    private _messageService: MessageService,
    public _projectService:ProjectService,
    private _authService: AuthenticationService,
    private _router: Router
  ){}

  registerUserForm = new FormGroup({
    name: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl(),
    image: new FormControl(),
    age: new FormControl(),
    confirmPassword: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  });

  registerTenantForm = new FormGroup({
    name: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl(),
    image: new FormControl(),
    address: new FormControl(),
    website: new FormControl(),
    confirmPassword: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  });

  registerUser(formGroup: FormGroup) {    
    if (formGroup.valid) {
      this._authService.userSingup(formGroup.value).subscribe({
        next:(response) => {
          this._authService.setUser(response.data.user,response.data.access_token);
          if(this._projectService.projectID){
            this._router.navigateByUrl(`/authorize/${this._projectService.projectID}`);
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
}
