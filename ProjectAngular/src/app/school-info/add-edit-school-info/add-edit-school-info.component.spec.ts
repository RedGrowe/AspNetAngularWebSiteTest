import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSchoolInfoComponent } from './add-edit-school-info.component';

describe('AddEditSchoolInfoComponent', () => {
  let component: AddEditSchoolInfoComponent;
  let fixture: ComponentFixture<AddEditSchoolInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSchoolInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSchoolInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
