import { Component } from '@angular/core';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectAngular';
  constructor(private service: SharedService) {
  }

  reg(): boolean {
    return this.service.registr;
  }
}
