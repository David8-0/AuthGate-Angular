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

constructor(
  private _authService:AuthenticationService
){
  
}
}
