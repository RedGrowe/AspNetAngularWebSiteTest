import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCommunicateComponent } from './add-edit-communicate.component';

describe('AddEditCommunicateComponent', () => {
  let component: AddEditCommunicateComponent;
  let fixture: ComponentFixture<AddEditCommunicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCommunicateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCommunicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
