import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSchoolInfoComponent } from './show-school-info.component';

describe('ShowSchoolInfoComponent', () => {
  let component: ShowSchoolInfoComponent;
  let fixture: ComponentFixture<ShowSchoolInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSchoolInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSchoolInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
