import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestInfoComponent } from './show-request-info.component';

describe('ShowRequestInfoComponent', () => {
  let component: ShowRequestInfoComponent;
  let fixture: ComponentFixture<ShowRequestInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRequestInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRequestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
