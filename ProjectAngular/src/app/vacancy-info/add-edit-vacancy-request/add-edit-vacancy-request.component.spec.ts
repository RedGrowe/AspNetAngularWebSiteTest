import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVacancyRequestComponent } from './add-edit-vacancy-request.component';

describe('AddEditVacancyRequestComponent', () => {
  let component: AddEditVacancyRequestComponent;
  let fixture: ComponentFixture<AddEditVacancyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditVacancyRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVacancyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
