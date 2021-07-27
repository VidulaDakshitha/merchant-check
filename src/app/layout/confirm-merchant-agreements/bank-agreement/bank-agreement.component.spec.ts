import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAgreementComponent } from './bank-agreement.component';

describe('BankAgreementComponent', () => {
  let component: BankAgreementComponent;
  let fixture: ComponentFixture<BankAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
