import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-add-edit-communicate',
  templateUrl: './add-edit-communicate.component.html',
  styleUrls: ['./add-edit-communicate.component.css']
})
export class AddEditCommunicateComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() com: any;
  CommunicationId!: string;
  CommunicationName!: string;

  ngOnInit(): void {
    this.CommunicationId = this.com.CommunicationId;
    this.CommunicationName = this.com.CommunicationName;
  }

  addCommunication(){
    var val = {CommunicationId: this.CommunicationId, CommunicationName: this.CommunicationName};

    this.service.addCommunication(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateCommunication(){
    var val = {CommunicationId: this.CommunicationId, CommunicationName: this.CommunicationName};

    this.service.updateCommunication(val).subscribe(res => {
      alert(res.toString());
    });
  }

}