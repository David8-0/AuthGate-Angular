import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PricingComponent } from '../components/pricing/pricing.component';
import { FooterComponent } from '../components/Core/footer/footer.component';
import { NavbarComponent } from '../components/Core/navbar/navbar.component';
import { UserSignupComponent } from '../components/Authorization/user-signup/user-signup.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,UserSignupComponent, PricingComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AuthGate';
}
