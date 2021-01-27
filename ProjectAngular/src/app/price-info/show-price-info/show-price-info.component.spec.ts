import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPriceInfoComponent } from './show-price-info.component';

describe('ShowPriceInfoComponent', () => {
  let component: ShowPriceInfoComponent;
  let fixture: ComponentFixture<ShowPriceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPriceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPriceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
