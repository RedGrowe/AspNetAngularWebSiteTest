import { Component, OnInit } from '@angular/core';
import {Times, User, FilterTime, SelectItem} from '../models/model.dto';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-timetable-admin',
  templateUrl: './timetableadmin.component.html'
})
export class TimeTableAdminComponent implements OnInit {
  constructor(private service: SharedService) {
  }

  days!: Date[];
  hours!: string[];
  times!: Times[];
  today: Date = new Date();
  courseList!: SelectItem[];
  filter: FilterTime = new FilterTime();
  showReport: any = false;
  timesEdit!: Times[];
  usersEdit!: User[];

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
    this.timesEdit = [];
    this.usersEdit = [];
    this.thisWeek();
    this.getHours();
    this.refreshCourseList();

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
    const hr = parseFloat(hour.substr(0, 2));
    const min = parseFloat(hour.substr(-2, 2));
    this.filter.DateNow = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hr, min, 0);
    this.service.getTimeForHour(this.filter).subscribe(data => {
      if (data != null) {
        this.timesEdit = data.Times;
        const timesBD = data.Account;
        for (const tBD of timesBD) {
          const tDTO = new User();
          tDTO.LastName = tBD.Lastname;
          tDTO.FirstName = tBD.Firstname;
          console.log(tBD);
          this.usersEdit.push(tDTO);
        }
        console.log(data);
        this.showReport = true;
        console.log(this.timesEdit);
        console.log(this.usersEdit);
        }
    });

  }

  colorRow(hour: string, day: Date): any{
    if (this.getUserDateTime(hour, day) != null) {
      if (this.getUserDateTime(hour, day).Value > this.getUserDateTime(hour, day).FactValue) {
        return {background: '#4dff4d'};
      } else {
        return {background: '#c63d5d'};
      }
    }
    else{
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
    this.service.getTimesAll(this.filter).subscribe(data => {
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
  refreshCourseList(){
    this.courseList = [];
    this.service.getCourse().subscribe(data => {
      const coursListn = data;
      for (const item of coursListn)  {
        const cours = new SelectItem();
        cours.label = item.Name;
        cours.value = item.Id;
        this.courseList.push(cours);
      }
      this.filter.CourseId = this.courseList[0].value;
      this.getTimes();
    });
  }

  closeShowReport() {
    this.showReport = false;
    this.getTimes();
  }

  addHour(time: Times) {
    time.FactValue++;
    this.service.updateTimes(this.timesEdit).subscribe(res => {
    });
  }

  delHour(time: Times) {
      time.FactValue--;
      this.service.updateTimes(this.timesEdit).subscribe(res => {
    });
  }
}
