import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../auth-service.service';
import {Router} from '@angular/router';
import {from, Observable, of as observableOf} from 'rxjs';
import {SharedService} from '../shared.service';
import {User} from '../models/model.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public authentic: AuthServiceService, public service: SharedService, public router: Router) {
  }

  public isAuthenticated!: Observable<boolean>;
  UserName!: any;
  Password!: any;
  profileId!: any;
  acc!: any;

  ContactAbout!: any;

  async ngOnInit() {
    this.getContactAbout();
    this.isAuthenticated = await this.authentic.IsAuth();
    if (await this.isAuthenticated.toPromise()){
      this.acc = await this.service.getAccount(JSON.stringify(localStorage.getItem('JWTToken')));
      this.profileId = this.acc.Username ;
    }
  }

  getContactAbout(){
    this.service.getSchoolAbout().subscribe(data => {
      this.ContactAbout = 'Наши контакты: ' + data.ContactAbout;
    });
  }

  async LoginClick(){
    const val = {
      Username: this.UserName, Password: this.Password
    };
    this.UserName = val.Username;
    await this.authentic.GetToken(val);
    /*Вызвать метод логина*/
    await this.authentic.GetRole();
    window.location.reload();
  }

  getUserRole(val: any){
    if (localStorage.getItem('Role') != null){
      // @ts-ignore
      if ( val === localStorage.getItem('Role').toString()){
        return true;
      }
      else{return false; }
    }
    else{return false; }
  }




  async LogoutClick(){
    await this.authentic.DeleteToken();
    this.UserName = '';
    this.Password = '';
    window.location.reload();
  }

}
