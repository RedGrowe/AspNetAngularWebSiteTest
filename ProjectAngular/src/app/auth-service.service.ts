import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  readonly APIUrl = 'http://192.168.0.220:8080/api';
  constructor(private http: HttpClient, public router: Router, private ser: SharedService) { }

  acc!: any;

  async GetToken(val: any): Promise<any>{
    return this.http.post<any>(this.APIUrl + '/Account/token', val).pipe(tap( await this.setToken)).toPromise();
  }

  async DeleteToken(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post<any>(this.APIUrl + '/Account/RemoveToken', JSON.stringify(localStorage.getItem('JWTToken')), {headers})
      .subscribe();
    localStorage.removeItem('JWTToken');
    localStorage.removeItem('Role');
  }


  private async setToken(response: any){
    localStorage.setItem('JWTToken', response.Token);
  }

  async GetRole(){
    this.acc = await this.ser.getAccount(JSON.stringify(localStorage.getItem('JWTToken')));
    const a = await this.ser.getRoleById(this.acc.Role);
    localStorage.setItem('Role', a.Name);
  }

  async IsAuth(): Promise<Observable<boolean>>{
    if (localStorage.getItem('JWTToken') != null){
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      let tkn = localStorage.getItem('JWTToken');
      let rl = localStorage.getItem('Role');
      return this.http.post<boolean>(this.APIUrl + '/Account/CheckToken', JSON.stringify(tkn + '+' + rl), {headers});
    }
    else{
      return observableOf(false);
    }

  }

}
