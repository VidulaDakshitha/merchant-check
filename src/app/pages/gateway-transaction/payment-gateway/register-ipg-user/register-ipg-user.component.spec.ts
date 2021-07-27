import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterIpgUserComponent } from './register-ipg-user.component';

describe('RegisterIpgUserComponent', () => {
  let component: RegisterIpgUserComponent;
  let fixture: ComponentFixture<RegisterIpgUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterIpgUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterIpgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
