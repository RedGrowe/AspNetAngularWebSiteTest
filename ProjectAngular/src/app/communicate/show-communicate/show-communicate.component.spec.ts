import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCommunicateComponent } from './show-communicate.component';

describe('ShowCommunicateComponent', () => {
  let component: ShowCommunicateComponent;
  let fixture: ComponentFixture<ShowCommunicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCommunicateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCommunicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
