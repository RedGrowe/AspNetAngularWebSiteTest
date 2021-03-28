import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-add-edit-communicate',
  templateUrl: './add-edit-communicate.component.html',
  styleUrls: ['./add-edit-communicate.component.css']
})
export class AddEditCommunicateComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() communicate: any;
  CommunicationId!: string;
  CommunicationName!: string;

  ngOnInit(): void {
    this.CommunicationId = this.communicate.Id;
    this.CommunicationName = this.communicate.CommunicationName;
  }

  addCommunication(){
    var val = {Id: this.CommunicationId, CommunicationName: this.CommunicationName};

    this.service.addCommunication(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateCommunication(){
    var val = {Id: this.CommunicationId, CommunicationName: this.CommunicationName};
    this.service.updateCommunication(val).subscribe(res => {
      alert(res.toString());
    });
  }

}
