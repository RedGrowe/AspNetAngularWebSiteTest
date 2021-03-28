import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ANGL';

  UserName!: any;
  Password!: any;

  IsAuth(): boolean {
    return false;
  }
}
