import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  isShowPassword:boolean = false;
  isShowConfirmPassword:boolean = false;
  showErrors:boolean = false;
  token:string | null=null;
  reseted:boolean = false;
  constructor(
    private _validationService:ValidationService,
    private _activateRoute: ActivatedRoute,
    private _authenticationService:AuthenticationService,
    private _messageService: MessageService
  ){}


 ngOnInit(): void {
     this._activateRoute.paramMap.subscribe(params => {
      this.token = params.get('token');
     })
 }

  resetPassword = new FormGroup({
    newPassword : new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmNewPassword : new FormControl('',Validators.required),
    token : new FormControl('')
  },{validators: this._validationService.passwordMatchValidator('newPassword','confirmNewPassword')});

  register(form:FormGroup){
    if(form.valid){
      form.get('token')?.setValue(this.token);
      this._authenticationService.resetPassword(form.value).subscribe({
        next:(res)=>{
          this.reseted=true;
        },
        error:(err)=>{
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there is a problem updating your password' });
        }
      })
    }else{
      this.showErrors = true;
    }
  }

  toggleShowPassword(){
    this.isShowPassword=!this.isShowPassword;
  }
  
  toggleShowConfirmPassword(){
    this.isShowConfirmPassword=!this.isShowConfirmPassword;
  }
}
