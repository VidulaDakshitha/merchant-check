import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryaAllTransactionComponent } from './summarya-all-transaction.component';

describe('SummaryaAllTransactionComponent', () => {
  let component: SummaryaAllTransactionComponent;
  let fixture: ComponentFixture<SummaryaAllTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryaAllTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryaAllTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
