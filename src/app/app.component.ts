import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PricingComponent } from '../components/pricing/pricing.component';
import { FooterComponent } from '../components/Core/footer/footer.component';
import { NavbarComponent } from '../components/Core/navbar/navbar.component';
import { UserSignupComponent } from '../components/Authorization/user-signup/user-signup.component';
import { LoaderComponent } from '../components/Core/loader/loader.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,UserSignupComponent, PricingComponent, FooterComponent,LoaderComponent,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[MessageService]
})
export class AppComponent {
  title = 'AuthGate';
}
