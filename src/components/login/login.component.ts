import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ){}

  loginForm = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    email: new FormControl('',[Validators.required,Validators.email]),
  });

  register(formGroup: FormGroup) {    
    if (formGroup.valid) {
      this._authService.logIn(formGroup.value).subscribe({
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
