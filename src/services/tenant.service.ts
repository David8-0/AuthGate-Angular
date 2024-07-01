import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UpdatePassword } from '../interfaces/update-password';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  domain:string="";
  endPoint:string="tenants/";
  baseUrl:string = ``;
  
  tenantsList:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  tenantsImages:string[] = [];

  constructor(private _http: HttpClient) { 
    this.domain=environment.domain;
    this.baseUrl = this.domain + this.endPoint;
  }

  updateTenantImage(teantID:string,photo:any):Observable<any>{
    return this._http.post(this.baseUrl+`image/${teantID}`,photo)
  }
  updateTenant(user:User):Observable<any>{
    console.log(user);
    
    return this._http.patch(this.baseUrl,user)
  }

  delete(userID:string):Observable<any>{
    return this._http.delete(this.baseUrl+userID);
  }

  getByID(userID:string):Observable<any>{
    return this._http.get(this.baseUrl+userID);
  }

  getAll():Observable<any>{
    return this._http.get(this.baseUrl);
  }

  updatePassword(updateForm:UpdatePassword):Observable<any>{
    return this._http.patch(this.baseUrl+"updateWithPassword",updateForm);
  }

  unDelete(userID:string):Observable<any>{
    return this._http.patch(this.baseUrl+"undelete/"+userID,{});
  }

}
