import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { PricingComponent } from '../pricing/pricing.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PricingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('upDownAnimation', [
      transition('* => *', [
        animate('2s infinite', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-50px)', offset: 0.5 }),
          style({ transform: 'translateY(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class HomeComponent {

}
