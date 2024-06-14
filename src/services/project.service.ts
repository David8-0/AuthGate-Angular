import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectID:string|null = null;
  baseUrl:string = `http://localhost:3000/projects/`;
  constructor(private _http: HttpClient) { }

  getByID(projID:string):Observable<any>{
    return this._http.get(this.baseUrl+projID);
  }


  getAll():Observable<any>{
    return this._http.get(this.baseUrl);
  }

  assingUserToProject(projID:string){

  }


}
