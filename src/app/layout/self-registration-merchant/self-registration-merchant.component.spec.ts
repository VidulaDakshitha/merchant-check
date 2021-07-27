import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfRegistrationMerchantComponent } from './self-registration-merchant.component';

describe('SelfRegistrationMerchantComponent', () => {
  let component: SelfRegistrationMerchantComponent;
  let fixture: ComponentFixture<SelfRegistrationMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfRegistrationMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfRegistrationMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
