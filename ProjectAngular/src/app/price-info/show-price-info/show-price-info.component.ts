import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-show-price-info',
  templateUrl: './show-price-info.component.html',
  styleUrls: ['./show-price-info.component.css']
})
export class ShowPriceInfoComponent implements OnInit {

  constructor(private service: SharedService) { }

  PriceList: any = [];

  ngOnInit(): void {
this.refreshCourseList();
  }

  refreshCourseList(){
    this.service.getPrice().subscribe(data => {
      this.PriceList = data;
    });
  }
}
