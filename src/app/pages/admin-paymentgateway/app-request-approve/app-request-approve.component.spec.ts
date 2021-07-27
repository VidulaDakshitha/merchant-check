import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestApproveComponent } from './app-request-approve.component';

describe('AppRequestApproveComponent', () => {
  let component: AppRequestApproveComponent;
  let fixture: ComponentFixture<AppRequestApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRequestApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRequestApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
