import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEditingComponent } from './show-editing.component';

describe('ShowEditingComponent', () => {
  let component: ShowEditingComponent;
  let fixture: ComponentFixture<ShowEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEditingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
