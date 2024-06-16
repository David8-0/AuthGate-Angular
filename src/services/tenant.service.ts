import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  baseUrl:string = `http://localhost:3000/tenants/`;
  constructor(private _http: HttpClient) { }

  updateTenantImage(teantID:string,photo:any):Observable<any>{
    return this._http.post(this.baseUrl+`image/${teantID}`,photo)
  }
  updateTenant(user:User):Observable<any>{
    return this._http.patch(this.baseUrl,user)
  }

  
}
