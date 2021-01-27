import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  getRole(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Role');
  }

  updateRole(val: any){
    return this.http.put(this.APIUrl + '/Role', val);
  }

  addRole(val: any){
    return this.http.post(this.APIUrl + '/Role', val);
  }

  deleteRole(val: any){
    return this.http.delete(this.APIUrl + '/Role/' + val);
  }



  getCommunication(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Communication');
  }
  updateCommunication(val: any){
    return this.http.put(this.APIUrl + '/Communication', val);
  }

  addCommunication(val: any){
    return this.http.post(this.APIUrl + '/Communication', val);
  }
  deleteCommunication(val: any){
    return this.http.delete(this.APIUrl + '/Communication/' + val);
  }


  getCourse(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Course');
  }
  updateCourse(val: any){
    return this.http.put(this.APIUrl + '/Course', val);
  }

  addCourse(val: any){
    return this.http.post(this.APIUrl + '/Course', val);
  }
  deleteCCourse(val: any){
    return this.http.delete(this.APIUrl + '/Course/' + val);
  }



  getRequest(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Request');
  }
  updateRequest(val: any){
    return this.http.put(this.APIUrl + '/Request', val);
  }

  addRequest(val: any){
    return this.http.post(this.APIUrl + '/Request', val);
  }
  deleteRequest(val: any){
    return this.http.delete(this.APIUrl + '/Request/' + val);
  }

}
