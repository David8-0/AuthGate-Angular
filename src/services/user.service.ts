import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string = `http://localhost:3000/users/`;
  constructor(private _http: HttpClient) { }

  updateUserImage(teantID:string,photo:any):Observable<any>{
    return this._http.post(this.baseUrl+`image/${teantID}`,photo)
  }

  updateUser(user:User):Observable<any>{
    return this._http.patch(this.baseUrl,user)
  }

  addUserToProject(projectId:string):Observable<any>{
    return this._http.post(this.baseUrl,{
      projectId
    });
  }
}
