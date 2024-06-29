import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymobService {

  loginApi:string = `https://accept.paymob.com/api/auth/tokens`
  createPaymentAPI:string = `https://accept.paymob.com/api/ecommerce/payment-links`
  constructor(private _http: HttpClient) { }

  login():Observable<any>{
    return this._http.post(this.loginApi,{
      "username":environment.paymobUsername,
      "password":environment.paymobPassword
    })
  }


  createPaymentLink(token:string):Observable<any>{
    const paymentData = {
      "auth_token": "AUTH_TOKEN_FROM_STEP_1",
    "product_name": "Product_NAME",
    "amount_cents": "4000",
    "currency": "EGP",
    "inventory": "1",
    "delivery_needed": "false",
   "integrations": [
      123,
      786
    ],
  "allow_quantity_edit": "false",
  "product_description": "Product_Description"
    };
    const data = 
       {
    "Payment_methods":environment.paymobIntegrationID,
    "amount_cents":5000,
    "full_name":"David Ayad",
    "email":"david@gmail.com",
    "phone_number": "+01234567891"
  }
    
    return this._http.post(this.createPaymentAPI,paymentData
    ,{
      headers:{
        "Authorization": `Token ${token}`,
        "type": "text"
      }
    })
  }
}




 