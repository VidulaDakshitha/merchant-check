import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwEmailComponent } from './reset-pw-email.component';

describe('ResetPwEmailComponent', () => {
  let component: ResetPwEmailComponent;
  let fixture: ComponentFixture<ResetPwEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPwEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPwEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
