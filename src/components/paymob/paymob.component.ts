import { Component, OnInit } from '@angular/core';
import { PaymobService } from '../../services/paymob.service';

@Component({
  selector: 'app-paymob',
  standalone: true,
  imports: [],
  templateUrl: './paymob.component.html',
  styleUrl: './paymob.component.css'
})
export class PaymobComponent implements OnInit{
  constructor(private _paymobService:PaymobService){}

ngOnInit(): void {
    this.login();
}

  login(){
    this._paymobService.login().subscribe({
      next:(res)=>{
        console.log(res.token);
        this._paymobService.createPaymentLink(res.token).subscribe({
          next:(res)=>{
            console.log(res);
          },
          error:(err)=>{console.log(err);
          }
        })

      },
      error:(err)=>{console.log(err)}
    })
  }
}

