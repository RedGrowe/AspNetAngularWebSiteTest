import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthServiceService} from './auth-service.service';
import {Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private service: AuthServiceService, public router: Router) {}
  isAuthenticated!: Observable<boolean>;
  isValid!: boolean;

  async canActivate(): Promise<boolean> {
    this.isAuthenticated = await this.service.IsAuth();
    if (await this.isAuthenticated.toPromise()){
      return true;
    }
    else{
      if (localStorage.getItem('JWTToken') != null){
        await this.service.DeleteToken();
      }
      await this.router.navigate(['school']);
      return false;
    }
  }
}
