import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignup } from '../interfaces/user-signup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl:string = `http://localhost:3000/user`;
  constructor(private _http: HttpClient) { }

  singup(user:UserSignup):Observable<any>{
    
    return this._http.post(this.baseUrl,user)
  }
}


