import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';


@Component({
  selector: 'app-show-role',
  templateUrl: './show-role.component.html',
  styleUrls: ['./show-role.component.css']
})
export class ShowRoleComponent implements OnInit {

  constructor(private service: SharedService) { }

  RoleList: any = [];

  ModalTitle!: string;
  ActivateAddEditRoleComp: boolean = false;
  rol: any;

  ngOnInit(): void {
    this.refreshRoleList();
  }

  addClick(){
    this.rol = {
      RoleId: 0,
      RoleName: ''
    };
    this.ModalTitle = 'Add New Role';
    this.ActivateAddEditRoleComp = true;
  }

  closeClick(){
    this.ActivateAddEditRoleComp = false;
    this.refreshRoleList();
  }


  editClick(item: any){
    this.rol = item;
    this.ModalTitle = 'Edit Role';
    this.ActivateAddEditRoleComp = true;
  }

  refreshRoleList(){
    this.service.getRole().subscribe(data => {
      this.RoleList = data;
    });
  }

}
