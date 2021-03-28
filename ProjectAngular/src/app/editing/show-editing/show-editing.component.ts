import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-show-editing',
  templateUrl: './show-editing.component.html',
  styleUrls: ['./show-editing.component.css']
})
export class ShowEditingComponent implements OnInit {

  constructor(private service: SharedService) { }

  PhotoFileName!: any;
  PhotoFilePath!: any;

  FirstDocPath!: any;
  SecondDocPath!: any;
  ThirdDocPath!: any;
  FourthDocPath!: any;
  TextAboutMe!: any;

  acc!: any;
  AccountInfo!: any;
  ProfileInfo!: any;


  CommunicationList: any = [];
  CourseList: any = [];
  AccountList: any = [];
  VacancyList: any = [];
  PriceList: any = [];
  RequestList: any = [];
  RequestVacancyList: any = [];


  SchoolAbout!: any;
  ContactAbout!: any;
  SchoolInfoId!: any;



  ModalTitle!: string;
  ActivateAddEditCommunicateComp!: boolean;
  ActivateAddEditCourseComp!: boolean;
  ActivateAddEditVacancyComp!: boolean;
  ActivateAddEditPriceComp!: boolean;
  ActivateAddEditProfileComp!: boolean;


  communicate: any;
  course: any;
  vacancy: any;
  price: any;
  user: any;

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    if (localStorage.getItem('Role').toString() === 'admin') {
      this.refreshCommunicateList();
      this.refreshCourseList();
      this.refreshAccountList();
      this.refreshVacancyList();
      this.refreshPriceList();
      this.getSchoolAbout();
      this.refreshRequestList();
      this.refreshRequestVacancyList();
      this.ActivateAddEditCommunicateComp = false;
      this.ActivateAddEditCourseComp = false;
      this.ActivateAddEditVacancyComp = false;
    }
    else {
      this.AccountInfo = await this.service.getAccount(JSON.stringify(localStorage.getItem('JWTToken')));
      this.ProfileInfo = await this.service.getProfileInfo();
      this.PhotoFilePath = this.service.PhotoUrl + this.ProfileInfo.MainPhoto;
      this.FirstDocPath = this.service.PhotoUrl + this.ProfileInfo.FirstDoc;
      this.SecondDocPath = this.service.PhotoUrl + this.ProfileInfo.SecondDoc;
      this.ThirdDocPath = this.service.PhotoUrl + this.ProfileInfo.ThirdDoc;
      this.FourthDocPath = this.service.PhotoUrl + this.ProfileInfo.FourthDoc;
      this.TextAboutMe = this.ProfileInfo.AboutMe;
    }
  }

  sendPaymentCode(item: any){
    this.service.sendPaymentRequestCode(item).subscribe();
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

  refreshVacancyList(){
    this.service.getVacancy().subscribe(data => {
      this.VacancyList = data;
    });
  }

  refreshAccountList(){
    this.service.getAccountList().subscribe(data => {
      this.AccountList = data;
    });
  }

  refreshPriceList(){
    this.service.getPrice().subscribe(data => {
      this.PriceList = data;
    });
  }
  refreshRequestList(){
    this.service.getRequest().subscribe(data => {
      this.RequestList = data;
    });
  }

  deleteRequest(item: any){
    if (confirm('Вы уверены?')){
      this.service.deleteRequest(item.Id).subscribe(data => {
        alert(data.toString());
        this.refreshRequestList();
      });
    }
  }


  refreshRequestVacancyList(){
    this.service.getRequestVacancy().subscribe(data => {
      this.RequestVacancyList = data;
    });
  }
  confirmRequestVacancy(item: any){
    this.service.confirmVacancyRequest(item).subscribe();
  }
  deleteRequestVacancy(item: any){
    if (confirm('Вы уверены?')){
      this.service.deleteRequestVacancy(item.Id).subscribe(data => {
        alert(data.toString());
        this.refreshRequestVacancyList();
      });
    }
  }

  getSchoolAbout(){
    this.service.getSchoolAbout().subscribe(data => {
      this.SchoolAbout = data.SchoolAbout;
      this.ContactAbout = data.ContactAbout;
      this.SchoolInfoId = data.Id;
    });
  }


  saveAboutMe(){
    this.service.updateProfileInfoAbout(localStorage.getItem('JWTToken'), this.TextAboutMe).subscribe();
    window.location.reload();
  }
  // @ts-ignore
  uploadPhotoMainPhoto(event){
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, this.AccountInfo.Username + '_MainPhoto_' + file.name);
    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      const splitter = file.name.toString().split(['.']);
      this.PhotoFilePath = this.service.PhotoUrl +  this.AccountInfo.Username + '_MainPhoto.' + splitter[splitter.length - 1];
    });
  }
  // @ts-ignore
  uploadFirstDoc(event){
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, this.AccountInfo.Username + '_FirstDoc_' + file.name);
    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      const splitter = file.name.toString().split(['.']);
      this.FirstDocPath = this.service.PhotoUrl +  this.AccountInfo.Username + '_FirstDoc.' + splitter[splitter.length - 1];
    });
  }
  // @ts-ignore
  uploadSecondDoc(event){
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, this.AccountInfo.Username + '_SecondDoc_' + file.name);
    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      const splitter = file.name.toString().split(['.']);
      this.SecondDocPath = this.service.PhotoUrl +  this.AccountInfo.Username + '_SecondDoc.' + splitter[splitter.length - 1];
    });
  }
  // @ts-ignore
  uploadThirdDoc(event){
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, this.AccountInfo.Username + '_ThirdDoc_' + file.name);
    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      const splitter = file.name.toString().split(['.']);
      this.ThirdDocPath = this.service.PhotoUrl +  this.AccountInfo.Username + '_ThirdDoc.' + splitter[splitter.length - 1];
    });
  }
  // @ts-ignore
  uploadFourthDoc(event){
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, this.AccountInfo.Username + '_FourthDoc_' + file.name);
    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      const splitter = file.name.toString().split(['.']);
      this.FourthDocPath = this.service.PhotoUrl +  this.AccountInfo.Username + '_FourthDoc.' + splitter[splitter.length - 1];
    });
  }

  getUserRole(val: any){
    if (localStorage.getItem('Role') != null){
      // @ts-ignore
      if ( val === localStorage.getItem('Role').toString()){
        return true;
      }
      else{return false; }
    }
    else{return false; }
  }

/**/
  addCommunicateClick(){
    this.communicate = {
      CommunicationId: undefined,
      CommunicationName: ''
    };
    this.ModalTitle = 'Добавить новый способ связи';
    this.ActivateAddEditCommunicateComp = true;
  }

  deleteCommunicateClick(item: any){
    if (confirm('Вы уверены?')){
      this.service.deleteCommunication(item.Id).subscribe(data => {
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

/**/
  addCourseClick(){
    this.course = {
      Id: undefined,
      Name: '',
      GroupName: ''
    };
    this.ModalTitle = 'Добавить новое направление';
    this.ActivateAddEditCourseComp = true;
  }

  deleteCourseClick(item: any){
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
/**/

  addVacancyClick(){
    this.vacancy = {
      Id: undefined,
      VacancyName: '',
      Visibility: false
    };
    this.ModalTitle = 'Добавить новую вакансию';
    this.ActivateAddEditVacancyComp = true;
  }
  deleteVacancyClick(item: any){
    if (confirm('Вы уверены?')){
      this.service.deleteVacancy(item.Id).subscribe(data => {
        alert(data.toString());
        this.refreshVacancyList();
      });
    }
  }

  closeVacancyClick(){
    this.ActivateAddEditVacancyComp = false;
    this.refreshVacancyList();
  }

  editVacancyClick(item: any){
    this.vacancy = item;
    this.ModalTitle = 'Редактировать вакансию';
    this.ActivateAddEditVacancyComp = true;
  }

/**/

  addPrice(){
    this.price = {
      Id: undefined,
      Course: '',
      Subjetct: '',
      FirstPrice: '',
      SecondPrice: '',
      ThirdPrice: '',
      FourthPrice: '',
      FifthPrice: '',
      SixthPrice: '',
      SeventhPrice: '',
      EighthPrice: '',
    };
    this.ModalTitle = 'Добавить новую стоимость';
    this.ActivateAddEditPriceComp = true;
  }
  deletePriceClick(item: any){
    if (confirm('Вы уверены?')){
      this.service.deletePrice(item.Id).subscribe(data => {
        alert(data.toString());
        this.refreshPriceList();
      });
    }
  }

  closePriceClick(){
    this.ActivateAddEditPriceComp = false;
    this.refreshPriceList();
  }

  editPriceClick(item: any){
    this.price = item;
    this.ModalTitle = 'Редактирование стоимости';
    this.ActivateAddEditPriceComp = true;
  }

/**/
  editUserClick(item: any){
    this.user = item;
    this.ModalTitle = 'Редактирование пользователя';
    this.ActivateAddEditProfileComp = true;
  }


  closeUserClick(){
    this.ActivateAddEditProfileComp = false;
    this.refreshAccountList();
  }


  /**/
  editSchoolAbout(){
    var val = {Id: this.SchoolInfoId, SchoolAbout: this.SchoolAbout, ContactAbout: this.ContactAbout};
    this.service.updateSchoolAbout(val).subscribe(res => {
      alert(res.toString());
    });
    window.location.reload();
  }

}
