import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCourseInfoComponent } from './add-edit-course-info.component';

describe('AddEditCourseInfoComponent', () => {
  let component: AddEditCourseInfoComponent;
  let fixture: ComponentFixture<AddEditCourseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCourseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
