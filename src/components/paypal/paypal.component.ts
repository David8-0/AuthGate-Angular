import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paypal',
  standalone: true,
  imports: [],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent {

  validTransactions: boolean = false;
  constructor(private _activatedRoute:ActivatedRoute){
    const status:string =_activatedRoute.snapshot.params['status'];
    console.log(status);
    
    if(status == 'callback'){
      this.validTransactions = true;      
    } 
  }

}
