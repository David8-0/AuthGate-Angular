import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  baseUrl:string = `http://localhost:3000/paypal/`;
  constructor(private _http: HttpClient) { }

  createOrder():Observable<any>{
    return this._http.post(this.baseUrl+"create-order",{});
  }

  validateOrder(orderID:string):Observable<any>{
    return this._http.post(this.baseUrl+`capture-order/`+orderID,{});
  }

}
