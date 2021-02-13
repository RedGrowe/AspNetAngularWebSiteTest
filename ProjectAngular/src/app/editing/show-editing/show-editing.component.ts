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
  CourseList: any = [];

  ModalTitle!: string;
  ActivateAddEditCommunicateComp!: boolean;
  ActivateAddEditCourseComp!: boolean;


  communicate: any;
  course: any;

  ngOnInit(): void {
    this.refreshCommunicateList();
    this.refreshCourseList();
    this.ActivateAddEditCommunicateComp = false;
    this.ActivateAddEditCourseComp = false;
  }


  refreshCommunicateList(){
    this.service.getCommunication().subscribe(data => {
      this.CommunicationList = data;
    });
  }

  refreshCourseList(){
    this.service.getCourse().subscribe(data => {
      this.CourseList = data;
    });
  }


  addCommunicateClick(){
    this.communicate = {
      CommunicationId: 0,
      CommunicationName: ''
    };
    this.ModalTitle = 'Добавить новый способ связи';
    this.ActivateAddEditCommunicateComp = true;
  }

  deleteCommunicate(item: any){
    if (confirm('Вы уверены?')){
      this.service.deleteCommunication(item.CommunicationId).subscribe(data => {
        alert(data.toString());
        this.refreshCommunicateList();
      });
    }
  }

  closeCommunicateClick(){
    this.ActivateAddEditCommunicateComp = false;
    this.refreshCommunicateList();
  }


  editCommunicateClick(item: any){
    this.communicate = item;
    this.ModalTitle = 'Редактировать способ связи';
    this.ActivateAddEditCommunicateComp = true;
  }


  addCourseClick(){
    this.course = {
      Id: 0,
      Name: '',
      GroupName: ''
    };
    this.ModalTitle = 'Добавить новое направление';
    this.ActivateAddEditCourseComp = true;
  }

  deleteCourse(item: any){
    if (confirm('Вы уверены?')){
      this.service.deleteCourse(item.Id).subscribe(data => {
        alert(data.toString());
        this.refreshCourseList();
      });
    }
  }

  closeCourseClick(){
    this.ActivateAddEditCourseComp = false;
    this.refreshCourseList();
  }


  editCourseClick(item: any){
    this.course = item;
    this.ModalTitle = 'Редактировать направление';
    this.ActivateAddEditCourseComp = true;
  }
}
