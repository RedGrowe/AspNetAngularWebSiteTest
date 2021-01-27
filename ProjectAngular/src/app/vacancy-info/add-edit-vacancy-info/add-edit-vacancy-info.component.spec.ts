import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVacancyInfoComponent } from './add-edit-vacancy-info.component';

describe('AddEditVacancyInfoComponent', () => {
  let component: AddEditVacancyInfoComponent;
  let fixture: ComponentFixture<AddEditVacancyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditVacancyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVacancyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
