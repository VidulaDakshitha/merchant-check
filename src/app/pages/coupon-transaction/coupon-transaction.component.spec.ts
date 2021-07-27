import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponTransactionComponent } from './coupon-transaction.component';

describe('CouponTransactionComponent', () => {
  let component: CouponTransactionComponent;
  let fixture: ComponentFixture<CouponTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
