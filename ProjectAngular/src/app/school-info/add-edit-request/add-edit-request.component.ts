import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-add-edit-request',
  templateUrl: './add-edit-request.component.html',
  styleUrls: ['./add-edit-request.component.css']
})
export class AddEditRequestComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() request: any;
  Code!: any;

  ngOnInit(): void {

  }

  async ConfirmClick() {
    if (await this.service.codeConfirm(JSON.stringify({mail: this.request.Email, code: this.Code}))){
     this.service.addRequest(this.request).subscribe();
    }
  }

}
