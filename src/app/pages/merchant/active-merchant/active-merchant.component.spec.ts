import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMerchantComponent } from './active-merchant.component';

describe('ActiveMerchantComponent', () => {
  let component: ActiveMerchantComponent;
  let fixture: ComponentFixture<ActiveMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
