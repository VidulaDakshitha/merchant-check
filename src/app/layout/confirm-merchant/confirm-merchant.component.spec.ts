import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMerchantComponent } from './confirm-merchant.component';

describe('ConfirmMerchantComponent', () => {
  let component: ConfirmMerchantComponent;
  let fixture: ComponentFixture<ConfirmMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
