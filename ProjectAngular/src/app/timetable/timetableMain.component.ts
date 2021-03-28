import { Component, OnInit } from '@angular/core';
import {Times, User, FilterTime} from '../models/model.dto';
import {SharedService} from '../shared.service';
@Component({
  selector: 'app-timetable-main',
  templateUrl: './timetableMain.component.html'
})
export class TimetableMainComponent implements OnInit {
  constructor(private service: SharedService) {
  }

  days!: Date[];
  hours!: string[];
  times!: Times[];
  today: Date = new Date();
  filter: FilterTime = new FilterTime();

  acc!: any;

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('JWTToken') != null) {
      this.acc = await this.service.getAccount(JSON.stringify(localStorage.getItem('JWTToken')));
      const user = await this.service.getUserSer(this.acc);
      this.service.user = user;
    }
    this.filter = new FilterTime();
    this.hours = [];
    this.times = [];
    this.thisWeek();
    this.getHours();
    this.getTimes();
  }

  thisWeek() {
    this.days = [];
    const day = this.today.getDay() || 7; // Get current day number, converting Sun. to 7
    if (day !== 0) {                // Only manipulate the date if it isn't Mon.
      this.today.setHours(-24 * (day));
    }
    for (let i = 0; i < 7; i++) {
      this.days.push(new Date(this.today.setDate(this.today.getDate() + 1)));
    }
  }

  getHours() {
    for (let i = 6; i < 24; i++) {
      if (i < 10) {
        this.hours.push('0' + i + ':00');
        this.hours.push('0' + i + ':30');
      } else {
        this.hours.push(i + ':00');
        this.hours.push(i + ':30');
      }
    }
  }

  getUserDateTime(hour: string, day: Date): any {
    const hr = parseFloat(hour.substr(0, 2));
    const min = parseFloat(hour.substr(-2, 2));
    const setDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hr, min, 0);
    for (const dayT of this.times){
      if (dayT.Date.toString() === setDate.toString()){
        return dayT;
      }
    }
    return null;
  }

  editWorkedTime(hour: string, day: Date) {
    for (const dayT of this.times){
      dayT.IsEdit = false;
    }
    if (this.getUserDateTime(hour, day) != null && this.getUserDateTime(hour, day).FactValue < 1){
    this.getUserDateTime(hour, day).IsEdit = true;
  }
  else{
  const tim = new Times();
  const hr = parseFloat(hour.substr(0, 2));
  const min = parseFloat(hour.substr(-2, 2));
  tim.Date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hr, min, 0);
  tim.Value = 0;
  tim.FactValue = 0;
  tim.IsEdit = true;
  tim.IdUser = this.service.user.Id;
  this.times.push(tim);
  console.log(this.times);
}
  }

  closeEditUserDateTime(hour: string, day: Date) {
    this.getUserDateTime(hour, day).IsEdit = false;
  }

  colorRow(hour: string, day: Date): any{
    // tslint:disable-next-line:triple-equals
    if (this.getUserDateTime(hour, day) != null && this.getUserDateTime(hour, day).Value != 0) {
      return {background: '#4dff4d'};
    } else {
      return {background: 'beige'};
    }

  }

  minusWeek() {
    this.today.setDate(this.today.getDate() - 7);
    this.ngOnInit();
  }

  plusWeek() {
      this.today.setDate(this.today.getDate() + 7);
      this.ngOnInit();
  }
  nowWeek() {
    this.today = new Date();
    this.ngOnInit();
  }
  getTimes(){
    this.filter.IdUser = this.service.user.Id;
    this.filter.DateFrom = new Date(this.days[0].getFullYear(), this.days[0].getMonth(), this.days[0].getDate(), 0, 0, 0);
    this.filter.DateTo = new Date(this.days[6].getFullYear(), this.days[6].getMonth(), this.days[6].getDate(), 23, 50, 0);
    this.service.getTimes(this.filter).subscribe(data => {
      if (data != null) {
        this.times = [];
        const timesBD = data;
        for (const tBD of timesBD) {
          const tDTO = new Times();
          tDTO.FactValue = tBD.FactValue;
          tDTO.Value = tBD.Value;
          tDTO.Date = new Date(tBD.Date);
          console.log(tBD.Date);
          console.log(tDTO.Date);
          console.log(this.today.getTimezoneOffset());
          tDTO.Date = new Date(tDTO.Date.setMinutes(tDTO.Date.getMinutes() - this.today.getTimezoneOffset()));
          console.log(tDTO.Date);
          tDTO.Id = tBD.Id;
          tDTO.IdUser = tBD.IdUser;
          this.times.push(tDTO);
        }
        console.log(this.times);
      }
    });
  }
  updateTimes(){
    this.service.updateTimes(this.times).subscribe(res => {
      alert(res.toString());
    });
  }
}
