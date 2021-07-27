import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTotalSalesComponent } from './chart-total-sales.component';

describe('ChartTotalSalesComponent', () => {
  let component: ChartTotalSalesComponent;
  let fixture: ComponentFixture<ChartTotalSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTotalSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTotalSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
