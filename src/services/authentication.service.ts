import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignup } from '../interfaces/user-signup';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { TenantSignup } from '../interfaces/tenant-signup';
import { SignIn } from '../interfaces/sign-in';
import { UserService } from './user.service';
import { TenantService } from './tenant.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl:string = `http://localhost:3000/auth/`;
  user:BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  
  constructor(
    private _http: HttpClient,
    private _userService: UserService,
    private _tenantService:TenantService,
    private _router:Router) 
    {
      if(localStorage.getItem('userID') && localStorage.getItem('role') ){
        let id = localStorage.getItem('userID');
        let role = localStorage.getItem('role');
        if((role == 'user' || role == 'admin') && id){
          _userService.getByID(id).subscribe({
            next:(res)=>{
              this.user.next(res.data);
            },
            error:err=>{
              this.logOut();
              _router.navigateByUrl('/error');
            }
          });
        }else if (role == 'tenant' && id){
          _tenantService.getByID(id).subscribe({
            next:(res)=>{
              this.user.next(res.data);
            },
            error:err=>{
              this.logOut();
              _router.navigateByUrl('/error');
            }
          });
        }
      }else{
        // this.logOut();
        // _router.navigateByUrl('/error');
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

  setUser(user:User,token?:string){
    this.user.next(user);
    if(token){
      localStorage.setItem("token", `${token}`);
    }
    localStorage.setItem("userID", this.user.value._id??"");
    localStorage.setItem("role", this.user.value.role??"");
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.user.next({} as User);
  }
  
  // SignInWithGoogle():Observable<any>{
  //   return this._http.get(this.baseUrl+"google")
  // }
}


