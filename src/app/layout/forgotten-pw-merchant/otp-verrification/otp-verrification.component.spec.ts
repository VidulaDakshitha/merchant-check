import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerrificationComponent } from './otp-verrification.component';

describe('OtpVerrificationComponent', () => {
  let component: OtpVerrificationComponent;
  let fixture: ComponentFixture<OtpVerrificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpVerrificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpVerrificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
