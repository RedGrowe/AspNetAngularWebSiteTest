import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoleComponent } from './role/role.component';
import { ShowRoleComponent } from './role/show-role/show-role.component';
import { AddEditRoleComponent } from './role/add-edit-role/add-edit-role.component';
import {SharedService} from './shared.service';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommunicateComponent } from './communicate/communicate.component';
import { ShowCommunicateComponent } from './communicate/show-communicate/show-communicate.component';
import { AddEditCommunicateComponent } from './communicate/add-edit-communicate/add-edit-communicate.component';
import { SchoolInfoComponent } from './school-info/school-info.component';
import { ShowSchoolInfoComponent } from './school-info/show-school-info/show-school-info.component';
import { AddEditSchoolInfoComponent } from './school-info/add-edit-school-info/add-edit-school-info.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { ShowCourseInfoComponent } from './course-info/show-course-info/show-course-info.component';
import { AddEditCourseInfoComponent } from './course-info/add-edit-course-info/add-edit-course-info.component';
import { PriceInfoComponent } from './price-info/price-info.component';
import { ShowPriceInfoComponent } from './price-info/show-price-info/show-price-info.component';
import { AddEditPriceInfoComponent } from './price-info/add-edit-price-info/add-edit-price-info.component';
import { VacancyInfoComponent } from './vacancy-info/vacancy-info.component';
import { ShowVacancyInfoComponent } from './vacancy-info/show-vacancy-info/show-vacancy-info.component';
import { AddEditVacancyInfoComponent } from './vacancy-info/add-edit-vacancy-info/add-edit-vacancy-info.component';
import { EditingComponent } from './editing/editing.component';
import { RequestInfoComponent } from './school-info/request-info/request-info.component';

@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    ShowRoleComponent,
    AddEditRoleComponent,
    CommunicateComponent,
    ShowCommunicateComponent,
    AddEditCommunicateComponent,
    SchoolInfoComponent,
    ShowSchoolInfoComponent,
    AddEditSchoolInfoComponent,
    CourseInfoComponent,
    ShowCourseInfoComponent,
    AddEditCourseInfoComponent,
    PriceInfoComponent,
    ShowPriceInfoComponent,
    AddEditPriceInfoComponent,
    VacancyInfoComponent,
    ShowVacancyInfoComponent,
    AddEditVacancyInfoComponent,
    EditingComponent,
    RequestInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
