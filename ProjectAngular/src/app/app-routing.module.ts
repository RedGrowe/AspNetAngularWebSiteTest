import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EditingComponent} from './editing/editing.component';
import {RoleComponent} from './role/role.component';
import {CommunicateComponent} from './communicate/communicate.component';


import {SchoolInfoComponent} from './school-info/school-info.component';
import {CourseInfoComponent} from './course-info/course-info.component';
import {PriceInfoComponent} from './price-info/price-info.component';
import {VacancyInfoComponent} from './vacancy-info/vacancy-info.component';

const routes: Routes = [
  {path: 'role', component: RoleComponent},
  {path: 'communication', component: CommunicateComponent},

  {path: 'school', component: SchoolInfoComponent},
  {path: 'course', component: CourseInfoComponent},
  {path: 'price', component: PriceInfoComponent},
  {path: 'vacancy', component: VacancyInfoComponent},
  {path: 'edit', component: EditingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
