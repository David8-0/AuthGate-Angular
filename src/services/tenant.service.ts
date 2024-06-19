import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UpdatePassword } from '../interfaces/update-password';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  baseUrl:string = `http://localhost:3000/tenants/`;
  tenantsList:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private _http: HttpClient) { }

  updateTenantImage(teantID:string,photo:any):Observable<any>{
    return this._http.post(this.baseUrl+`image/${teantID}`,photo)
  }
  updateTenant(user:User):Observable<any>{
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

}
