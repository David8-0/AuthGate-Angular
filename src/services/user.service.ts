import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UpdatePassword } from '../interfaces/update-password';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersList:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  domain:string="";
  endPoint:string="users/";
  baseUrl:string = ``;
  // user:BehaviorSubject<User> = new BehaviorSubject<User>({});
  
  constructor(private _http: HttpClient) {
    this.domain=environment.domain;
    this.baseUrl = this.domain + this.endPoint;
   }

  updateUserImage(teantID:string,photo:any):Observable<any>{
    return this._http.post(this.baseUrl+`image/${teantID}`,photo)
  }

  updateUser(user:User):Observable<any>{
    return this._http.patch(this.baseUrl,user)
  }

  addUserToProject(projectId:string,codeChallenge:string):Observable<any>{
    return this._http.post(this.baseUrl,{
      projectId,
      codeChallenge
    });
  }

  getByID(userID:string):Observable<any>{
    return this._http.get(this.baseUrl+userID);
  }
  // getuserAndProjects(userID:string):Observable<any>{
  //   return this._http.get(this.baseUrl+"projects/"+userID);
  // }

  getAll():Observable<any>{
    return this._http.get(this.baseUrl);
  }


  delete(userID:string):Observable<any>{
    return this._http.delete(this.baseUrl+userID);
  }

  deleteProject(userId:string,projectID:string):Observable<any>{
    return this._http.delete(this.baseUrl+"project/"+userId +"/"+projectID);
  }

  unDeleteProject(userId:string,projectID:string):Observable<any>{
    return this._http.patch(this.baseUrl+"undelete-project/"+userId +"/"+projectID,{});
  }

  updatePassword(updateForm:UpdatePassword):Observable<any>{
    return this._http.patch(this.baseUrl+"updateWithPassword",updateForm);
  }

  unDelete(userID:string):Observable<any>{
    return this._http.patch(this.baseUrl+"undelete/"+userID,{});
  }

}
