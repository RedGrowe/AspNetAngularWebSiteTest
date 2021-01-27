import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPriceInfoComponent } from './add-edit-price-info.component';

describe('AddEditPriceInfoComponent', () => {
  let component: AddEditPriceInfoComponent;
  let fixture: ComponentFixture<AddEditPriceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPriceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPriceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
