import { Component, OnInit } from '@angular/core';
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


  Id!: any;
  Name!: any;
  CourseName!: any;
  CommunicationName!: any;
  MobilePhone!: any;


  ngOnInit(): void {
    this.refreshCommunicationList();
    this.refreshCourseList();
  }


  refreshCourseList(){
    this.service.getCourse().subscribe(data => {
      this.CourseList = data;
    });
  }

  refreshCommunicationList(){
    this.service.getCommunication().subscribe(data => {
      this.CommunicationList = data;
    });
  }

  SendRequest(){
    var val = {
      Id: this.Id, Name: this.Name, CourseName: this.CourseName,
      MobilePhone: this.MobilePhone, CommunicationName: this.CommunicationName};

    this.service.addRequest(val).subscribe(res => {
      alert(res.toString());
    });
  }
}
