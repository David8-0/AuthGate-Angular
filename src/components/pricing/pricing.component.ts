import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
user : User = {} as User;
constructor(
  private _authService:AuthenticationService
){
  _authService.user.subscribe((newUser) =>{
    this.user = newUser;
    console.log(this.user);
    
  });
}
}
