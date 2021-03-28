import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './models/model.dto';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = 'http://192.168.0.220:8080/api';
readonly PhotoUrl = 'http://192.168.0.220:8080/Photos/';
  public user!: User; /*Добавить инициализацию*/

  constructor(private http: HttpClient) { }

  sendPaymentRequestCode(val: any){
    return this.http.post(this.APIUrl + '/Payment/sendPaymentCode', val);
  }


  getRole(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Role');
  }
  async getRoleById(val: any): Promise<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.APIUrl + '/Role/GetRole', JSON.stringify(val), {headers}).toPromise();
  }

  async getProfileInfo(): Promise<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.APIUrl + '/Profile/GetProfile', JSON.stringify(localStorage.getItem('JWTToken')), {headers}).toPromise();
  }
  async getProfileInfoByUsername(val: any): Promise<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.APIUrl + '/Profile/GetProfileByUsername', JSON.stringify(val), {headers} ).toPromise();

  }
  updateProfileInfByUsername(val: any){
    return this.http.post(this.APIUrl + '/Profile/UpdateProfileByUsername', val);
  }
  updateProfileCTLink(firstVal: any, secondVal: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const sender = JSON.stringify({ first: firstVal, second: secondVal});
    return this.http.post(this.APIUrl + '/Profile/UpdateProfileCTLink', JSON.stringify(sender), {headers});
  }

  updateProfileInfoAbout(firstVal: any, secondVal: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const sender = JSON.stringify({ first: firstVal, second: secondVal});
    return this.http.post(this.APIUrl + '/Profile/UpdateAboute', JSON.stringify(sender), {headers});
  }

  /*РОЛИ*/

  updateRole(val: any){
    return this.http.put(this.APIUrl + '/Role', val);
  }

  addRole(val: any){
    return this.http.post(this.APIUrl + '/Role', val);
  }

  deleteRole(val: any){
    return this.http.delete(this.APIUrl + '/Role/' + val);
  }




  /*СПОСОБЫ СВЯЗИ*/

  getCommunication(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Communication');
  }
  updateCommunication(val: any){
    return this.http.put(this.APIUrl + '/Communication', val);
  }

  addCommunication(val: any){
    return this.http.post(this.APIUrl + '/Communication', val);
  }
  deleteCommunication(val: any){

    return this.http.delete(this.APIUrl + '/Communication/' + val);
  }


  /*ЗАЯВКИ НА ВАКАНСИЮ*/
  addVacancyRequest(val: any){
    return this.http.post(this.APIUrl + '/RequestVacancy', val);
  }

  getRequestVacancy(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/RequestVacancy');
  }
  deleteRequestVacancy(val: any){
    return this.http.delete(this.APIUrl + '/RequestVacancy/' + val);
  }

  sendVacancyMail(val: any): Observable<any>{
    return this.http.post(this.APIUrl + '/RequestVacancy/mail', val);
  }

  async codeVacancyConfirm(val: any): Promise<boolean>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<boolean>(this.APIUrl + '/RequestVacancy/MailConfirm', JSON.stringify(val), {headers}).toPromise();
  }

  confirmVacancyRequest(val: any){
    return this.http.post(this.APIUrl + '/RequestVacancy/sendMailData', val);
  }

  /*НАПРАВЛЕНИЯ ПОДГОТОВКИ*/

  getCourse(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Course');
  }
  updateCourse(val: any){
    return this.http.put(this.APIUrl + '/Course', val);
  }

  addCourse(val: any){
    return this.http.post(this.APIUrl + '/Course', val);
  }
  deleteCourse(val: any){
    return this.http.delete(this.APIUrl + '/Course/' + val);
  }

  /*ВАКАНСИИ*/

  getVacancy(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Vacancy');
  }
  updateVacancy(val: any){
    return this.http.put(this.APIUrl + '/Vacancy', val);
  }
  addVacancy(val: any){
    return this.http.post(this.APIUrl + '/Vacancy', val);
  }
  deleteVacancy(val: any){
    return this.http.delete(this.APIUrl + '/Vacancy/' + val);
  }

  /*?????????*/

  getSchoolAbout(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/SchoolInfo');
  }
  updateSchoolAbout(val: any){
    return this.http.put(this.APIUrl + '/SchoolInfo', val);
  }


  /*ЗАЯВКИ НА ОБУЧЕНИЕ*/

  getRequest(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Request');
  }
  updateRequest(val: any){
    return this.http.put(this.APIUrl + '/Request', val);
  }

  addRequest(val: any){
    return this.http.post(this.APIUrl + '/Request', val);
  }
  deleteRequest(val: any){
    return this.http.delete(this.APIUrl + '/Request/' + val);
  }


  /*ЦЕНЫ НА ОБУЧЕНИЕ*/

  getPrice(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Price');
  }
  updatePrice(val: any){
    return this.http.put(this.APIUrl + '/Price', val);
  }
  addPrice(val: any){
    return this.http.post(this.APIUrl + '/Price', val);
  }
  deletePrice(val: any){
    return this.http.delete(this.APIUrl + '/Price/' + val);
  }


  /**/

  UploadPhoto(val: any){
    return this.http.post(this.APIUrl + '/Account/SaveFile', val);
  }



  sendMail(val: any): Observable<any>{
    return this.http.post<any>(this.APIUrl + '/Request/mail', val);
  }



  async codeConfirm(val: any): Promise<boolean>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<boolean>(this.APIUrl + '/Request/MailConfirm', JSON.stringify(val), {headers}).toPromise();
  }


  async getAccount(val: any): Promise<Observable<any>>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.APIUrl + '/Account/GetAccount', val, {headers}).toPromise();
  }
  getAccountList(): Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Account');
  }

  async getUserSer(val: any): Promise<any>{
    return this.http.post<any>(this.APIUrl + '/Account/login', val).toPromise();
  }





  getTimes(val: any): Observable<any>{
    return this.http.post<any>(this.APIUrl + '/TimeTable/getTime', val);
  }
  getTimesAll(val: any): Observable<any>{
    return this.http.post<any>(this.APIUrl + '/TimeTable/getTimeAll', val);
  }
  updateTimes(val: any){
    return this.http.post(this.APIUrl + '/TimeTable', val);
  }
  getTimeForHour(val: any): Observable<any>{
    return this.http.post<any>(this.APIUrl + '/TimeTable/getTimeForHour', val);
  }
 /* const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post<boolean>(this.APIUrl + '/Account/CheckToken', JSON.stringify(localStorage.getItem('JWTToken')), {headers});*/
}
