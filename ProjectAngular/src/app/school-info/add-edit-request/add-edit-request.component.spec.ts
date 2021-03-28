import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRequestComponent } from './add-edit-request.component';

describe('AddEditRequestComponent', () => {
  let component: AddEditRequestComponent;
  let fixture: ComponentFixture<AddEditRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
