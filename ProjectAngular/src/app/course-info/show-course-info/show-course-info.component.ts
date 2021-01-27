import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';


@Component({
  selector: 'app-show-course-info',
  templateUrl: './show-course-info.component.html',
  styleUrls: ['./show-course-info.component.css']
})
export class ShowCourseInfoComponent implements OnInit {

  constructor(private service: SharedService) { }

  CourseList: any = [];


  ngOnInit(): void {
    this.refreshCourseList();
  }

  refreshCourseList(){
    this.service.getCourse().subscribe(data => {
      this.CourseList = data;
    });
  }

}
