import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReqestComponent } from './app-reqest.component';

describe('AppReqestComponent', () => {
  let component: AppReqestComponent;
  let fixture: ComponentFixture<AppReqestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppReqestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReqestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
