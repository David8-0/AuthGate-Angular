import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  isShowPassword:boolean = false;
  isShowConfirmPassword:boolean = false;
  showErrors:boolean = false;
  token:string | null=null;

  constructor(
    private _validationService:ValidationService,
    private _activateRoute: ActivatedRoute,
  ){}


 ngOnInit(): void {
     this._activateRoute.paramMap.subscribe(params => {
      this.token = params.get('token');
      console.log(this.token);
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
      console.log(form.value);
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
