import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('upDownAnimation', [
      transition('* => *', [
        animate('1s', style({ transform: 'translateY(-50px)' })),
        animate('1s', style({ transform: 'translateY(50px)' }))
      ])
    ])
  ]
})
export class HomeComponent {

}
