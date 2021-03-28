import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-payment',
  templateUrl: './show-payment.component.html',
  styleUrls: ['./show-payment.component.css']
})
export class ShowPaymentComponent implements OnInit {

  constructor() { }

  code!: any;
  isActive!: any;

  ngOnInit(): void {
  }

  confirmCode(){
    if (this.code === '759261'){
      this.isActive = true;
    }
    else{
      this.isActive = false;
    }
  }
}
