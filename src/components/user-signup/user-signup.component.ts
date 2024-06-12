import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  constructor(
    private _authService: AuthenticationService,
    private _router: Router
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
      this._authService.userSingup(formGroup.value).subscribe({
        next:(response) => {
          this._authService.setUser(response.user,response.access_token);
          this._router.navigateByUrl('/home');
          },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}
