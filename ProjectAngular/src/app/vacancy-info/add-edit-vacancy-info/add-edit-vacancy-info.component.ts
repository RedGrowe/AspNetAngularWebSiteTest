import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-add-edit-vacancy-info',
  templateUrl: './add-edit-vacancy-info.component.html',
  styleUrls: ['./add-edit-vacancy-info.component.css']
})
export class AddEditVacancyInfoComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() vacancy: any;
  Id!: string;
  VacancyName!: string;
  Visibility!: boolean;

  ngOnInit(): void {
    this.Id = this.vacancy.Id;
    this.VacancyName = this.vacancy.VacancyName;
    this.Visibility = false;
  }

  addVacancy(){
    var val = {Id: this.Id, VacancyName: this.VacancyName, Visibility: this.Visibility};
    this.service.addVacancy(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateVacancy(){
    var val = {Id: this.Id, VacancyName: this.VacancyName, Visibility: this.Visibility};

    this.service.updateVacancy(val).subscribe(res => {
      alert(res.toString());
    });
  }
}
