import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVacancyInfoComponent } from './show-vacancy-info.component';

describe('ShowVacancyInfoComponent', () => {
  let component: ShowVacancyInfoComponent;
  let fixture: ComponentFixture<ShowVacancyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVacancyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVacancyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
