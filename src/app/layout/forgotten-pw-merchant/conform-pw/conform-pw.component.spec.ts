import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformPwComponent } from './conform-pw.component';

describe('ConformPwComponent', () => {
  let component: ConformPwComponent;
  let fixture: ComponentFixture<ConformPwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConformPwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConformPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
