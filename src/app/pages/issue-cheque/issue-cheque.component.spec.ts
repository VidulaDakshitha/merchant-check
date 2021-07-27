import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueChequeComponent } from './issue-cheque.component';

describe('IssueChequeComponent', () => {
  let component: IssueChequeComponent;
  let fixture: ComponentFixture<IssueChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
