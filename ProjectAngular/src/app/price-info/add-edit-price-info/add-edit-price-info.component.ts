import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-add-edit-price-info',
  templateUrl: './add-edit-price-info.component.html',
  styleUrls: ['./add-edit-price-info.component.css']
})
export class AddEditPriceInfoComponent implements OnInit {

  @Input() price: any;

  Subjetct!: any;
  Course!: any;

  FirstPrice!: any;
  SecondPrice: any;
  ThirdPrice: any;
  FourthPrice: any;
  FifthPrice: any;
  SixthPrice: any;
  SeventhPrice: any;
  EighthPrice: any;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.Subjetct = this.price.Subjetct;
    this.Course = this.price.Course;
    this.FirstPrice = this.price.FirstPrice;
    this.SecondPrice = this.price.SecondPrice;
    this.ThirdPrice = this.price.ThirdPrice;
    this.FourthPrice = this.price.FourthPrice;
    this.FifthPrice = this.price.FifthPrice;
    this.SixthPrice = this.price.SixthPrice;
    this.SeventhPrice = this.price.SeventhPrice;
    this.EighthPrice = this.price.EighthPrice;
  }

  addPrice(){
    const val =
      {
        Id: undefined,
        Course: this.Course,
        Subjetct: this.Subjetct,
        FirstPrice: this.FirstPrice,
        SecondPrice: this.SecondPrice,
        ThirdPrice: this.ThirdPrice,
        FourthPrice: this.FourthPrice,
        FifthPrice: this.FifthPrice,
        SixthPrice: this.SixthPrice,
        SeventhPrice: this.SeventhPrice,
        EighthPrice: this.EighthPrice
      };


    this.service.addPrice(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updatePrice(){
    const val =
      {
        Id: this.price.Id,
        Course: this.Course,
        Subjetct: this.Subjetct,
        FirstPrice: this.FirstPrice,
        SecondPrice: this.SecondPrice,
        ThirdPrice: this.ThirdPrice,
        FourthPrice: this.FourthPrice,
        FifthPrice: this.FifthPrice,
        SixthPrice: this.SixthPrice,
        SeventhPrice: this.SeventhPrice,
        EighthPrice: this.EighthPrice
      };
    this.service.updatePrice(val).subscribe(res => {
      alert(res.toString());
    });
  }
}
