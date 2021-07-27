import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnChequeComponent } from './return-cheque.component';

describe('ReturnChequeComponent', () => {
  let component: ReturnChequeComponent;
  let fixture: ComponentFixture<ReturnChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
