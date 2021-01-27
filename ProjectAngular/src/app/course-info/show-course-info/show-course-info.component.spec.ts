import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCourseInfoComponent } from './show-course-info.component';

describe('ShowCourseInfoComponent', () => {
  let component: ShowCourseInfoComponent;
  let fixture: ComponentFixture<ShowCourseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCourseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
