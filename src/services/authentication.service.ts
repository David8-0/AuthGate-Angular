import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignup } from '../interfaces/user-signup';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { TenantSignup } from '../interfaces/tenant-signup';
import { SignIn } from '../interfaces/sign-in';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl:string = `http://localhost:3000/auth/`;
  user:BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  
  constructor(private _http: HttpClient) {
      if(localStorage.getItem('user')){
        const user = JSON.parse(`${localStorage.getItem('user')}`);
        this.user.next(user);
      }
   }

  userSingup(user:UserSignup):Observable<any>{
    return this._http.post(this.baseUrl+"registeruser",user);
  }

  tenantSingup(tenant:TenantSignup):Observable<any>{
    return this._http.post(this.baseUrl+"registertenant",tenant);
  }

  logIn(login:SignIn):Observable<any>{
    return this._http.post(this.baseUrl+"login",login);
  }

  setUser(user:User,token:string){
    this.user.next(user);
    localStorage.setItem("token", `${token}`);
    localStorage.setItem("user", JSON.stringify(this.user.value));
  }
}


