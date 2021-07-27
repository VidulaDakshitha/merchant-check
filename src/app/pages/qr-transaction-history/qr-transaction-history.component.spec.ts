import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrTransactionHistoryComponent } from './qr-transaction-history.component';

describe('QrTransactionHistoryComponent', () => {
  let component: QrTransactionHistoryComponent;
  let fixture: ComponentFixture<QrTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
