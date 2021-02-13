import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-add-edit-course-info',
  templateUrl: './add-edit-course-info.component.html',
  styleUrls: ['./add-edit-course-info.component.css']
})
export class AddEditCourseInfoComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() course: any;
  Id!: string;
  Name!: string;
  GroupNumber!: string;

  ngOnInit(): void {
    this.Id = this.course.Id;
    this.Name = this.course.Name;
    this.GroupNumber = this.course.GroupNumber;
  }

  addCourse(){
    var val = {Id: this.Id, Name: this.Name, GroupNumber: this.GroupNumber};

    this.service.addCourse(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateCourse(){
    var val = {Id: this.Id, Name: this.Name, GroupNumber: this.GroupNumber};

    this.service.updateCourse(val).subscribe(res => {
      alert(res.toString());
    });
  }

}
