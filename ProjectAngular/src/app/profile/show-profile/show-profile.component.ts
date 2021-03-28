import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  constructor(private service: SharedService) { }

  ProfileInfo!: any;
  FirstDocPath!: any;
  SecondDocPath!: any;
  ThirdDocPath!: any;
  FourthDocPath!: any;
  TextAboutMe!: any;

  Course!: any;
  Grade!: any;

  PhotoFileName!: string;
  PhotoFilePath!: string;
  AccountInfo!: any;

  async ngOnInit(): Promise<void> {
    this.AccountInfo = await this.service.getAccount(JSON.stringify(localStorage.getItem('JWTToken')));

    this.AccountInfo = await this.service.getAccount(JSON.stringify(localStorage.getItem('JWTToken')));
    this.ProfileInfo = await this.service.getProfileInfo();


    if (this.ProfileInfo.MainPhotoConfirmed === true){
      this.PhotoFilePath = this.service.PhotoUrl + this.ProfileInfo.MainPhoto;
    }
    if (this.ProfileInfo.FirstConfirmed === true){
      this.FirstDocPath = this.service.PhotoUrl + this.ProfileInfo.FirstDoc;
    }
    if (this.ProfileInfo.SecondConfirmed === true){
      this.SecondDocPath = this.service.PhotoUrl + this.ProfileInfo.SecondDoc;
    }
    if (this.ProfileInfo.ThirdConfirmed === true){
      this.ThirdDocPath = this.service.PhotoUrl + this.ProfileInfo.ThirdDoc;
    }
    if (this.ProfileInfo.FourthConfirmed === true){
      this.FourthDocPath = this.service.PhotoUrl + this.ProfileInfo.FourthDoc;
    }
    this.Course = this.ProfileInfo.Course;
    this.Grade = this.ProfileInfo.Grade;

    this.TextAboutMe = this.ProfileInfo.AboutMe;
  }


}
