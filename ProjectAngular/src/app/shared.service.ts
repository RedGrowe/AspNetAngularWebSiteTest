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
    return this.http.get<any>(this.APIUrl + '/communication');
  }
  updateCommunication(val: any){
    return this.http.put(this.APIUrl + '/communication', val);
  }

  addCommunication(val: any){
    return this.http.post(this.APIUrl + '/communication', val);
  }
  deleteCommunication(val: any){
    return this.http.delete(this.APIUrl + '/communication/' + val);
  }


}
