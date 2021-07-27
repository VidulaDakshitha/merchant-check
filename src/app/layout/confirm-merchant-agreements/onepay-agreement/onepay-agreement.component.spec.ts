import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnepayAgreementComponent } from './onepay-agreement.component';

describe('OnepayAgreementComponent', () => {
  let component: OnepayAgreementComponent;
  let fixture: ComponentFixture<OnepayAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnepayAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnepayAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
