import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-add-edit-profile',
  templateUrl: './add-edit-profile.component.html',
  styleUrls: ['./add-edit-profile.component.css']
})
export class AddEditProfileComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() user: any;

  course!: any;
  grade!: any;
  Name!: any;

  PhotoFilePath!: any;
  FirstDocPath!: any;
  SecondDocPath!: any;
  ThirdDocPath!: any;
  FourthDocPath!: any;

  MainPhotoConfirmed!: any;
  FirstConfirmed!: any;
  SecondConfirmed!: any;
  ThirdConfirmed!: any;
  FourthConfirmed!: any;

  profile!: any;

  CourseList: any = [];


  async ngOnInit(): Promise<void> {
    this.profile =  await this.service.getProfileInfoByUsername(this.user.Username);

    this.refreshCourseList();


    this.PhotoFilePath = this.service.PhotoUrl + this.profile.MainPhoto;
    this.FirstDocPath = this.service.PhotoUrl + this.profile.FirstDoc;
    this.SecondDocPath = this.service.PhotoUrl + this.profile.SecondDoc;
    this.ThirdDocPath = this.service.PhotoUrl + this.profile.ThirdDoc;
    this.FourthDocPath = this.service.PhotoUrl + this.profile.FourthDoc;

    this.MainPhotoConfirmed = this.profile.MainPhotoConfirmed;
    this.FirstConfirmed = this.profile.FirstConfirmed;
    this.SecondConfirmed = this.profile.SecondConfirmed;
    this.ThirdConfirmed = this.profile.ThirdConfirmed;
    this.FourthConfirmed = this.profile.FourthConfirmed;
    this.course = this.profile.Course;
    this.grade = this.profile.Grade;
  }


  refreshCourseList(){
    this.service.getCourse().subscribe(data => {
      this.CourseList = data;
      this.Name = this.CourseList[0];
    });
  }

  updateProfile(){
    this.profile.FirstConfirmed = this.FirstConfirmed;
    this.profile.SecondConfirmed = this.SecondConfirmed;
    this.profile.ThirdConfirmed = this.ThirdConfirmed;
    this.profile.FourthConfirmed = this.FourthConfirmed;
    this.profile.MainPhotoConfirmed = this.MainPhotoConfirmed;
    this.profile.grade = this.grade;
    this.profile.course = this.Name.Name;

    this.service.updateProfileCTLink(this.Name.Id, this.user.Id).subscribe();
    this.service.updateProfileInfByUsername(this.profile).subscribe();
  }
}
