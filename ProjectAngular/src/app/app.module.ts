import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, OnInit } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoleComponent } from './role/role.component';
import { ShowRoleComponent } from './role/show-role/show-role.component';
import { AddEditRoleComponent } from './role/add-edit-role/add-edit-role.component';
import {SharedService} from './shared.service';
import {AuthguardService} from './authguard.service';

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
import { ShowEditingComponent } from './editing/show-editing/show-editing.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import { HomeComponent } from './home/home.component';
import { AddEditProfileComponent } from './profile/add-edit-profile/add-edit-profile.component';


import {TimetableMainComponent} from './timetable/timetableMain.component';
import {NgbDropdownConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/ru';
import {TimeTableAdminComponent} from './timetable/timeTableAdmin.component';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MenuModule} from 'primeng/menu';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {FileUploadModule} from 'primeng/fileupload';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ContextMenuModule} from 'primeng/contextmenu';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ColorPickerModule} from 'primeng/colorpicker';
import {MegaMenuModule} from 'primeng/megamenu';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TreeTableModule} from 'primeng/treetable';
import {TooltipModule} from 'primeng/tooltip';
import {CheckboxModule} from 'primeng/checkbox';
import {PaginatorModule} from 'primeng/paginator';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TreeModule} from 'primeng/tree';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {FieldsetModule} from 'primeng/fieldset';
import {SidebarModule} from 'primeng/sidebar';
import {PanelModule} from 'primeng/panel';
import {ListboxModule} from 'primeng/listbox';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AccordionModule} from 'primeng/accordion';
import {MultiSelectModule} from 'primeng/multiselect';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DragDropModule} from 'primeng/dragdrop';
import { AddEditRequestComponent } from './school-info/add-edit-request/add-edit-request.component';
import { ShowRequestInfoComponent } from './school-info/show-request-info/show-request-info.component';
import { AddEditVacancyRequestComponent } from './vacancy-info/add-edit-vacancy-request/add-edit-vacancy-request.component';
import { PaymentComponent } from './payment/payment.component';
import { ShowPaymentComponent } from './payment/show-payment/show-payment.component';
registerLocaleData(locale);

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
    RequestInfoComponent,
    ShowEditingComponent,
    ProfileComponent,
    ShowProfileComponent,
    HomeComponent,
    AddEditProfileComponent,
    TimetableMainComponent,
    TimeTableAdminComponent,
    AddEditRequestComponent,
    ShowRequestInfoComponent,
    AddEditVacancyRequestComponent,
    PaymentComponent,
    ShowPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModule,
    BrowserAnimationsModule,
    DialogModule,
    ReactiveFormsModule,
    CheckboxModule,
    ToggleButtonModule,
    ToastModule,
    ConfirmDialogModule,
    ContextMenuModule,
    SidebarModule,
    ListboxModule,
    InputTextModule,
    InputSwitchModule,
    DialogModule,
    CalendarModule,
    DragDropModule,
    TooltipModule,
    FileUploadModule,
    DropdownModule,
    InputMaskModule,
    AutoCompleteModule,
    SelectButtonModule,
    CardModule,
    MenuModule,
    ColorPickerModule,
    AccordionModule,
    RadioButtonModule,
    FieldsetModule,
    MegaMenuModule,
    OverlayPanelModule,
    TieredMenuModule,
    ScrollPanelModule,
    ProgressSpinnerModule,
    PanelModule
  ],
  providers: [SharedService, AuthguardService, { provide: LOCALE_ID, useValue: 'ru-RU' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
