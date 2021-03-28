import { Component, OnInit } from '@angular/core';
import {SharedService} from './shared.service';
import {AuthServiceService} from './auth-service.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sss';
}
