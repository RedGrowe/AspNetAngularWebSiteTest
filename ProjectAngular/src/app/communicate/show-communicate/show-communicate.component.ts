import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-show-communicate',
  templateUrl: './show-communicate.component.html',
  styleUrls: ['./show-communicate.component.css']
})
export class ShowCommunicateComponent implements OnInit {

  constructor(private service: SharedService) { }

  CommunicateList: any = [];

  ModalTitle!: string;
  ActivateAddEditComComp: boolean = false;
  com: any;

  ngOnInit(): void {
    this.refreshCommunicateList();
  }


  addClick(){
    this.com = {
      CommunicationId: 0,
      CommunicationName: ''
    };
    this.ModalTitle = 'Add New Role';
    this.ActivateAddEditComComp = true;
  }

  closeClick(){
    this.ActivateAddEditComComp = false;
    this.refreshCommunicateList();
  }


  editClick(item: any){
    this.com = item;
    this.ModalTitle = 'Edit Role';
    this.ActivateAddEditComComp = true;
  }

  refreshCommunicateList(){
    this.service.getCommunication().subscribe(data => {
      this.CommunicateList = data;
    });
  }
}
