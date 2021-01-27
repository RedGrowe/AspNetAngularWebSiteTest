import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-show-editing',
  templateUrl: './show-editing.component.html',
  styleUrls: ['./show-editing.component.css']
})
export class ShowEditingComponent implements OnInit {

  constructor(private service: SharedService) { }

  CommunicationList: any = [];
  RoleList: any = [];
  CourseList: any = [];

  ngOnInit(): void {
    this.refreshCommunicateList();
    this.refreshRoleList();
    this.refreshCourseList();
  }


  refreshCommunicateList(){
    this.service.getCommunication().subscribe(data => {
      this.CommunicationList = data;
    });
  }
  refreshRoleList(){
    this.service.getRole().subscribe((data => {
      this.RoleList = data;
    }));
  }

  refreshCourseList(){
    this.service.getCourse().subscribe((data => {
      this.CourseList = data;
    }))
  }
}
