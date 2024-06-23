import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  //projectID:string|null = null;
  baseUrl:string = `http://localhost:3000/projects/`;
  projectsArr:BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([] as Project[]);
  constructor(private _http: HttpClient) { }

  getByID(projID:string):Observable<any>{
    return this._http.get(this.baseUrl+projID);
  }


  getAllPerTenant():Observable<any>{
    return this._http.get(this.baseUrl+"targetTenant");
  }

  // assingUserToProject(projID:string){

  // }

  addProject(project:Project):Observable<any>{
    return this._http.post(this.baseUrl,project);
  }

  updateProject(projectID:string,project:Project):Observable<any>{
    return this._http.patch(this.baseUrl+projectID,project);
  }

  deleteProject(projectID:string):Observable<any>{
    return this._http.delete(this.baseUrl+projectID);
  }

  undeleteProject(projectID:string):Observable<any>{
    return this._http.patch(this.baseUrl+projectID+"/undelete",{});
  }
}
