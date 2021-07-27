import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpgReportComponent } from './ipg-report.component';

describe('IpgReportComponent', () => {
  let component: IpgReportComponent;
  let fixture: ComponentFixture<IpgReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpgReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpgReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
