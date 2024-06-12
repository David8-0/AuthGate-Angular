import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  constructor(
    private _authService: AuthenticationService
  ){}

  registerForm = new FormGroup({
    name: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl(),
    image: new FormControl(),
    age: new FormControl(),
    confirmPassword: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  });

  register(formGroup: FormGroup) {    
    if (formGroup.valid) {
      this._authService.singup(formGroup.value).subscribe({
        next:(response) => {
            console.log(response);
          },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}
