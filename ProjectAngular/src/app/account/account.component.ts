import { Component, OnInit } from '@angular/core';
import {User} from '../models/model.dto';
import {SharedService} from '../shared.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  authorization: any;
  registration!: boolean;
  success: any;
  exit: any;
  user!: User;
  users: any;
  constructor(private service: SharedService) {
  }
  ngOnInit(): void {
  this.authorization = true;
  this.registration = false;
  this.success = false;
  this.exit = false;
  this.user = new User();
  this.users = [];
  }


  onEnter(){
    console.log(this.user);
    this.service.getAccount(this.user).subscribe(data => {
      if(data != null) {
        this.user = data;
        this.authorization = false;
        this.exit = true;
        this.service.registr = true;
      }
      else{
        this.user = new User();
        this.user.UserName = "Отсутствует такой пользователь";
        this.user.Password = "Отсутствует такой пароль";
        this.service.registr = false;
      }
      });
  }
  onExit() {
    this.authorization = true;
    this.exit = false;
    this.service.registr = false;
  }
}
