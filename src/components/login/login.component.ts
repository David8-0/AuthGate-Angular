import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private _authService: AuthenticationService
  ){}

  loginForm = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    email: new FormControl('',[Validators.required,Validators.email]),
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
