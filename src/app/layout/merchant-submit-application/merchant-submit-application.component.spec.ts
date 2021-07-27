import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSubmitApplicationComponent } from './merchant-submit-application.component';

describe('MerchantSubmitApplicationComponent', () => {
  let component: MerchantSubmitApplicationComponent;
  let fixture: ComponentFixture<MerchantSubmitApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantSubmitApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantSubmitApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
