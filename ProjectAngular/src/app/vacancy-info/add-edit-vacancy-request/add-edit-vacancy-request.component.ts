import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-add-edit-vacancy-request',
  templateUrl: './add-edit-vacancy-request.component.html',
  styleUrls: ['./add-edit-vacancy-request.component.css']
})
export class AddEditVacancyRequestComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() vacancyRequest: any;
  Code!: any;

  ngOnInit(): void {


  }

  async ConfirmClick() {

    if (await this.service.codeVacancyConfirm(JSON.stringify({mail: this.vacancyRequest.Email, code: this.Code}))){
      this.service.addVacancyRequest(this.vacancyRequest).subscribe();
    }
  }

}
