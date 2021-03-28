import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-show-vacancy-info',
  templateUrl: './show-vacancy-info.component.html',
  styleUrls: ['./show-vacancy-info.component.css']
})
export class ShowVacancyInfoComponent implements OnInit {

  constructor(private service: SharedService) { }

  vacancyRequest!: any;

  VacancyList: any = [];
  CommunicationList: any = [];

  SchoolAbout!: string;

  Id!: any;
  FirstName!: string;
  VacancyName!: any;
  CommunicationName!: any;
  MobilePhone!: any;
  Email!: any;

  LastName!: string;
  Name!: string;
  MiddleName!: string;

  ngOnInit(): void {
    this.refreshCommunicationList();
    this.refreshVacancyList();
  }


  refreshVacancyList(){
    this.service.getVacancy().subscribe(data => {
      this.VacancyList = data;
    });

  }

  refreshCommunicationList(){
    this.service.getCommunication().subscribe(data => {
      this.CommunicationList = data;
    });
  }


  SendRequest(){

    this.FirstName = this.LastName + '.' + this.Name + '.' + this.MiddleName;
    var val = {
      Id: this.Id, Name: this.FirstName, Email: this.Email, Mobile: this.MobilePhone, Vacancy: this.VacancyName, Communication: this.CommunicationName};

    this.service.sendVacancyMail(val).subscribe(res => {
      alert(res.toString());
    });

    this.vacancyRequest = val;

  }
}
