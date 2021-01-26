import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RoleComponent} from './role/role.component';
import {CommunicateComponent} from './communicate/communicate.component';

const routes: Routes = [
  {path: 'role', component: RoleComponent},
  {path: 'communication', component: CommunicateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
