import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingMerchantComponent } from './view-pending-merchant.component';

describe('ViewPendingMerchantComponent', () => {
  let component: ViewPendingMerchantComponent;
  let fixture: ComponentFixture<ViewPendingMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPendingMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPendingMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
