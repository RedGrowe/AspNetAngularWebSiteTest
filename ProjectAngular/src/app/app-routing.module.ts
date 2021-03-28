import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EditingComponent} from './editing/editing.component';
import {RoleComponent} from './role/role.component';
import {CommunicateComponent} from './communicate/communicate.component';


import {SchoolInfoComponent} from './school-info/school-info.component';
import {CourseInfoComponent} from './course-info/course-info.component';
import {PriceInfoComponent} from './price-info/price-info.component';
import {VacancyInfoComponent} from './vacancy-info/vacancy-info.component';
import {ProfileComponent} from './profile/profile.component';
import {TimeTableAdminComponent} from './timetable/timeTableAdmin.component';
import {TimetableMainComponent} from './timetable/timetableMain.component';
import {AuthguardService as AuthGuard} from './authguard.service';
import {PaymentComponent} from './payment/payment.component';

const routes: Routes = [
  {path: 'role', component: RoleComponent, canActivate: [AuthGuard]},
  {path: 'communication', component: CommunicateComponent, canActivate: [AuthGuard]},

  {path: 'school', component: SchoolInfoComponent},
  {path: 'course', component: CourseInfoComponent},
  {path: 'price', component: PriceInfoComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'vacancy', component: VacancyInfoComponent},
  {path: 'timetableadmin', component: TimeTableAdminComponent, canActivate: [AuthGuard]},
  {path: 'timetablemain', component: TimetableMainComponent, canActivate: [AuthGuard]},
  {path: 'edit', component: EditingComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'school', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
