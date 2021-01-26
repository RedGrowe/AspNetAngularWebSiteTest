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

@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    ShowRoleComponent,
    AddEditRoleComponent,
    CommunicateComponent,
    ShowCommunicateComponent,
    AddEditCommunicateComponent
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
