import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSubtypeComponent } from './business-subtype.component';

describe('BusinessSubtypeComponent', () => {
  let component: BusinessSubtypeComponent;
  let fixture: ComponentFixture<BusinessSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
