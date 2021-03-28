import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.css']
})
export class RequestInfoComponent implements OnInit {

  constructor(private service: SharedService) { }
  CourseList: any = [];
  CommunicationList: any = [];

  SchoolAbout!: string;

  Id!: any;
  FirstName!: string;
  Name!: any;
  CommunicationName!: any;
  MobilePhone!: any;
  Email!: any;

  request!: any;


  ngOnInit(): void {
    this.refreshCommunicationList();
    this.refreshCourseList();
    this.getSchoolAbout();
  }

  getSchoolAbout(){
    this.service.getSchoolAbout().subscribe(data => {
      this.SchoolAbout = data.SchoolAbout;
    });

  }

  refreshCourseList(){
    this.service.getCourse().subscribe(data => {
      this.CourseList = data;
      this.Name = this.CourseList[0].Name;
    });
  }

  refreshCommunicationList(){
    this.service.getCommunication().subscribe(data => {
      this.CommunicationList = data;
      const index = data.indexOf('252d5897-c71e-4f41-95c1-3c3a37b52c7f');
      console.warn(index);
      this.CommunicationName = data[0].CommunicationName;
    });
  }

  SendRequest(){
    var val = {
      Id: this.Id, Name: this.FirstName, CourseName: this.Name,
      MobilePhone: this.MobilePhone, CommunicationName: this.CommunicationName, Email: this.Email};

    this.service.sendMail(val).subscribe(res => {
      alert(res.toString());
    });

    this.request = val;
  }

  SendRequest2(){
    var val = {
      Id: this.Id, Name: this.FirstName, CourseName: this.Name,
      MobilePhone: this.MobilePhone, CommunicationName: this.CommunicationName};

    this.service.addRequest(val).subscribe(res => {
      alert(res.toString());
    });
  }


}
