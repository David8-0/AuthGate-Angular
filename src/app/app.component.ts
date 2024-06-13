import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { UserSignupComponent } from '../components/user-signup/user-signup.component';
import { PricingComponent } from '../components/pricing/pricing.component';
import { FooterComponent } from '../components/footer/footer.component';


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
