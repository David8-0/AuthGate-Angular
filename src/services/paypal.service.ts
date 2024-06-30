import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  domain:string="";
  endPoint:string="paypal/";
  baseUrl:string = ``;
  constructor(private _http: HttpClient) { 
    this.domain=environment.domain;
    this.baseUrl = this.domain + this.endPoint;
  }

  createOrder():Observable<any>{
    return this._http.post(this.baseUrl+"create-order",{});
  }

  validateOrder(orderID:string):Observable<any>{
    return this._http.post(this.baseUrl+`capture-order/`+orderID,{});
  }

}
