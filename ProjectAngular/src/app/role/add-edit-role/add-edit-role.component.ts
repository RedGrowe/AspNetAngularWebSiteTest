import { Component, OnInit, Input } from '@angular/core';
import {SharedService} from '../../shared.service';


@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.css']
})
export class AddEditRoleComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() rol: any;
  RoleId!: string;
  RoleName!: string;

  ngOnInit(): void {
    this.RoleId = this.rol.RoleId;
    this.RoleName = this.rol.RoleName;
  }

  addRole(){
    var val = {RoleId: this.RoleId, RoleName: this.RoleName};

    this.service.addRole(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateRole(){
    var val = {RoleId: this.RoleId, RoleName: this.RoleName};

    this.service.updateRole(val).subscribe(res => {
      alert(res.toString());
    });
  }


}
